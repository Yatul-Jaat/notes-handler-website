import React, { useRef, useEffect, useState } from "react";
import { MdArrowOutward, MdDownload, MdVisibility, MdFilterList, MdQuiz } from "react-icons/md";
import usePapersData from "../../apiHandel/papersData.js";

const PYQPage = () => {
  const { papers: apiPapers = [], loading = true, error = null } = usePapersData() || {};

  // Only use API data (with safety check)
  const papersData = Array.isArray(apiPapers) ? apiPapers : [];
  const [filteredPYQ, setFilteredPYQ] = useState(papersData);
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedterm, setSelectedterm] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  // Animation refs
  const titleRef = useRef();
  const subtitleRef = useRef();
  const filterRef = useRef();
  const cardsRef = useRef();

  // Filter functions
  const filterPYQ = () => {
    let filtered = [...papersData];
    
    if (selectedYear !== "All") {
      filtered = filtered.filter(pyq => pyq.year === selectedYear);
    }
    
    if (selectedterm !== "All") {
      filtered = filtered.filter(pyq => pyq.term === selectedterm);
    }

    if (selectedDifficulty !== "All") {
      filtered = filtered.filter(pyq => pyq.difficulty === selectedDifficulty);
    }
    
    setFilteredPYQ(filtered);
  };

  useEffect(() => {
    filterPYQ();
  }, [selectedYear, selectedterm, selectedDifficulty,papersData]);

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
  }, [filteredPYQ]);

  // Split text for animation
  const titleText = "Previous Year Questions";
  
  const handlePractice = (pdf) => {
    window.open(`http://localhost:3000/files/${pdf}`,"_blank")
    // Add your practice logic here
  };

  const handleDownload = (pdf) => {
    window.open(`http://localhost:3000/files/${pdf}`,"_blank")
    // Add your download logic here
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return { bg: '#dcfce7', text: '#15803d' };
      case 'Medium': return { bg: '#fed7aa', text: '#c2410c' };
      case 'Hard': return { bg: '#fecaca', text: '#dc2626' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(to bottom, #f9fafb, #ffffff)'}}>
      {/* Header Section */}
      <div className="px-4 lg:px-16 py-16 lg:py-24">
        <div className="text-center mb-12">
          <div className="text-4xl lg:text-6xl font-bold mb-6 overflow-hidden" style={{color: '#1f2937'}}>
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
                    transitionDelay: `${index * 50}ms`,
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
            Master your exams with comprehensive collections of previous year questions organized by subject and difficulty
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
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>

            <select
              value={selectedterm}
              onChange={(e) => setSelectedterm(e.target.value)}
              className="px-4 py-2 rounded-full focus:outline-none transition-colors"
              style={{
                border: '2px solid #d1d5db',
                focusBorderColor: '#3b82f6'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              <option value="All">All Terms</option>
              <option value="Endsem">Endsem</option>
              <option value="Insem">Insem</option>
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 rounded-full focus:outline-none transition-colors"
              style={{
                border: '2px solid #d1d5db',
                focusBorderColor: '#3b82f6'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      {/* PYQ Cards Section */}
      <div className="px-4 lg:px-16 pb-16">
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPYQ.map((pyq, index) => {
            const difficultyColors = getDifficultyColor(pyq.difficulty);
            return (
              <div
                key={pyq._id}
                className={`pyq-card rounded-2xl overflow-hidden group transition-all duration-500 transform ${
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
                        style={{background: 'linear-gradient(to right, #8b5cf6, #ec4899)'}}
                      >
                        {pyq.year}
                      </div>
                      <div 
                        className={`px-3 py-1 rounded-full text-sm font-medium`}
                        style={{
                          backgroundColor: pyq.term === 'Endsem' ? '#ddd6fe' : '#bfdbfe',
                          color: pyq.term === 'Endsem' ? '#7c3aed' : '#2563eb'
                        }}
                      >
                        {pyq.term}
                      </div>
                    </div>
                    <div 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: difficultyColors.bg,
                        color: difficultyColors.text
                      }}
                    >
                      {pyq.difficulty}
                    </div>
                  </div>

                  <h3 
                    className="text-xl font-bold mb-2 group-hover:transition-colors transition-colors duration-300"
                    style={{color: '#1f2937'}}
                    onMouseEnter={(e) => e.target.style.color = '#8b5cf6'}
                    onMouseLeave={(e) => e.target.style.color = '#1f2937'}
                  >
                    {pyq.subject}
                  </h3>
                  
                  <p className="text-sm mb-4 line-clamp-2" style={{color: '#4b5563'}}>
                    {pyq.description}
                  </p>

                  <div className="flex justify-between items-center text-sm mb-4" style={{color: '#6b7280'}}>
                    <span className="flex items-center gap-1">
                      <MdQuiz />
                      {pyq.totalQuestions} questions
                    </span>
                    <span>{pyq.studentYear}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 pb-6">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handlePractice(pyq.pdfFile)}
                      className="flex-1 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:bg-black hover:text-white"
                      style={{backgroundColor: '#8b5cf6', border: '2px solid transparent'}}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#000000';
                        e.target.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#8b5cf6';
                        e.target.style.color = '#ffffff';
                      }}
                    >
                      <MdVisibility />
                      Practice
                    </button>
                    <button
                      onClick={()=> handleDownload(pyq.pdfFile)}
                      className="flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 border-2 hover:bg-black hover:text-white"
                      style={{
                        backgroundColor: 'transparent',
                        color: '#1f2937',
                        borderColor: '#d1d5db'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#000000';
                        e.target.style.color = '#ffffff';
                        e.target.style.borderColor = '#000000';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#1f2937';
                        e.target.style.borderColor = '#d1d5db';
                      }}
                    >
                      <MdDownload />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results Message */}
        {filteredPYQ.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-2" style={{color: '#1f2937'}}>No questions found</h3>
            <p style={{color: '#4b5563'}}>Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>

      {/* Bottom Statistics */}
      <div 
        className="text-white py-12"
        style={{background: 'linear-gradient(to right, #8b5cf6, #ec4899)'}}
      >
        <div className="container mx-auto px-4 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{papersData.length}</div>
              <div style={{color: '#e9d5ff'}}>Question Sets</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {papersData.reduce((sum, pyq) => sum + pyq.totalQuestions, 0)}+
              </div>
              <div style={{color: '#e9d5ff'}}>Total Questions</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4</div>
              <div style={{color: '#e9d5ff'}}>Years Covered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PYQPage;