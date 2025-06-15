import React, { useRef, useEffect, useState } from "react";
import { MdArrowOutward, MdDownload, MdVisibility, MdFilterList } from "react-icons/md";
import useNotesData from "../../apiHandel/notesData.js";

const Notes = () => {
  // Get data from API with default values to prevent undefined errors
  const { notes: apiNotes = [], loading = true, error = null } = useNotesData() || {};

  // Only use API data (with safety check)
  const notesData = Array.isArray(apiNotes) ? apiNotes : [];

  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedTerm, setSelectedTerm] = useState("All");

  // Animation refs
  const titleRef = useRef();
  const subtitleRef = useRef();
  const filterRef = useRef();
  const cardsRef = useRef();

  // Main filtering effect
useEffect(() => {
  let filtered = [...notesData];
  
  if (selectedYear !== "All") {
    filtered = filtered.filter(note => note.year === selectedYear);
  }
  
  if (selectedTerm !== "All") {
    filtered = filtered.filter(note => note.term === selectedTerm);
  }
  
  setFilteredNotes(filtered);
}, [notesData, selectedYear, selectedTerm]); // ✅ Proper dependencies

// Initialize filteredNotes when data first loads
useEffect(() => {
  if (notesData.length > 0 && filteredNotes.length === 0) {
    setFilteredNotes(notesData);
  }
}, [notesData]);

  // Animation effects using CSS transitions and React state
  const [isLoaded, setIsLoaded] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    // Trigger initial animations
    setTimeout(() => setIsLoaded(true), 100);
    
    // Set up intersection observer for cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCardsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Reset card animations when filters change
  useEffect(() => {
    setCardsVisible(false);
    setTimeout(() => setCardsVisible(true), 50);
  }, [filteredNotes]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(to bottom, #f9fafb, #ffffff)'}}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg" style={{color: '#4b5563'}}>Loading notes...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(to bottom, #f9fafb, #ffffff)'}}>
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold mb-2" style={{color: '#1f2937'}}>Error loading notes</h3>
          <p style={{color: '#4b5563'}}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Split text for animation
  const titleText = "Study Notes";
  
  const handleView = (pdf) => {
    window.open(`http://localhost:3000/files/${pdf}`,"_blank")
  };

  const handleDownload = (noteId) => {
    console.log(`Downloading note with ID: ${noteId}`);
    // Add your download logic here
  };

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(to bottom, #f9fafb, #ffffff)'}}>
      {/* Header Section */}
      <div className="px-4 lg:px-16 py-16 lg:py-24">
        <div className="text-center mb-12">
          <div className="text-5xl lg:text-7xl font-bold mb-6 overflow-hidden" style={{color: '#1f2937'}}>
            <div 
              ref={titleRef}
              className={`transform transition-all duration-1000 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
              }`}
            >
              {titleText.split("").map((char, index) => (
                <span 
                  key={index} 
                  className={`inline-block transform transition-all duration-700 ease-out`}
                  style={{ 
                    display: "inline-block",
                    transitionDelay: `${index * 100}ms`,
                    transform: isLoaded ? 'translateY(0)' : 'translateY(100px)',
                    opacity: isLoaded ? 1 : 0
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>
          <p 
            ref={subtitleRef} 
            className={`text-xl lg:text-2xl max-w-3xl mx-auto transform transition-all duration-1000 ease-out delay-800 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{color: '#4b5563'}}
          >
            Access comprehensive study materials organized by year, subject, and examination term
            {apiNotes.length > 0 && (
              <span className="block text-sm mt-2 text-green-600">✓ Data loaded from API</span>
            )}
            {apiNotes.length === 0 && !loading && (
              <span className="block text-sm mt-2 text-yellow-600">⚠ No data available from API</span>
            )}
          </p>
        </div>

        {/* Filter Section */}
        <div 
          ref={filterRef} 
          className={`flex flex-col lg:flex-row gap-6 justify-center items-center mb-12 transform transition-all duration-1000 ease-out delay-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center gap-2">
            <MdFilterList className="text-2xl" style={{color: '#4b5563'}} />
            <span className="text-lg font-medium" style={{color: '#374151'}}>Filter by:</span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 rounded-full focus:outline-none transition-colors"
              style={{
                border: '2px solid #d1d5db',
                focusBorderColor: '#3b82f6'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              <option value="All">All Years</option>
              <option value="First">First Year</option>
              <option value="Second">Second Year</option>
              <option value="Third">Third Year</option>
              <option value="Fourth">Fourth Year</option>
            </select>

            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="px-4 py-2 rounded-full focus:outline-none transition-colors"
              style={{
                border: '2px solid #d1d5db',
                focusBorderColor: '#3b82f6'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              <option value="All">All Terms</option>
              <option value="Insem">Insem</option>
              <option value="Endsem">Endsem</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notes Cards Section */}
      <div className="px-4 lg:px-16 pb-16">
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredNotes.map((note, index) => (
            <div
              key={note._id}
              className={`note-card rounded-2xl overflow-hidden group transition-all duration-500 transform ${
                cardsVisible 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-16 opacity-0 scale-95'
              }`}
              style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                transitionDelay: `${index * 150}ms`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 25px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.transform = cardsVisible ? 'translateY(-8px)' : 'translateY(-8px) translateY(64px) scale(0.95)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.transform = cardsVisible ? 'translateY(0)' : 'translateY(64px) scale(0.95)';
              }}
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="text-white text-sm font-bold px-3 py-1 rounded-full"
                      style={{background: 'linear-gradient(to right, #3b82f6, #8b5cf6)'}}
                    >
                      {note.year}
                    </div>
                    <div 
                      className={`px-3 py-1 rounded-full text-sm font-medium`}
                      style={{
                        backgroundColor: note.term === 'Insem' ? '#dcfce7' : '#fed7aa',
                        color: note.term === 'Insem' ? '#15803d' : '#c2410c'
                      }}
                    >
                      {note.term}
                    </div>
                  </div>
                </div>

                <h3 
                  className="text-xl font-bold mb-2 group-hover:transition-colors transition-colors duration-300"
                  style={{color: '#1f2937'}}
                  onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                  onMouseLeave={(e) => e.target.style.color = '#1f2937'}
                >
                  {note.subject}
                </h3>
                
                <p className="text-sm mb-4 line-clamp-2" style={{color: '#4b5563'}}>
                  {note.description}
                </p>

                <div className="flex justify-between items-center text-sm mb-4" style={{color: '#6b7280'}}>
                  <span>Total chapters: {note.totalChapters}</span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="px-6 pb-6">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleView(note.pdfFile)}
                    className="flex-1 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    style={{backgroundColor: '#3b82f6'}}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                  >
                    <MdVisibility />
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(note.pdfFile)}
                    className="flex-1 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    style={{backgroundColor: '#1f2937'}}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#111827'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#1f2937'}
                  >
                    <MdDownload />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {!loading && filteredNotes.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold mb-2" style={{color: '#1f2937'}}>
              {notesData.length === 0 ? 'No notes available' : 'No notes found'}
            </h3>
            <p style={{color: '#4b5563'}}>
              {notesData.length === 0 
                ? 'Please check your API connection or try again later' 
                : 'Try adjusting your filters to see more results'
              }
            </p>
          </div>
        )}
      </div>

      {/* Bottom Statistics */}
      <div 
        className="text-white py-12"
        style={{background: 'linear-gradient(to right, #3b82f6, #8b5cf6)'}}
      >
        <div className="container mx-auto px-4 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{notesData.length}</div>
              <div style={{color: '#bfdbfe'}}>Total Subjects</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {notesData.reduce((sum, note) => sum + note.totalChapters, 0)}+
              </div>
              <div style={{color: '#bfdbfe'}}>Study Notes</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4</div>
              <div style={{color: '#bfdbfe'}}>Academic Years</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;