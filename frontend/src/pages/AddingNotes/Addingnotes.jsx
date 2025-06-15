import React, { useState, useRef } from "react";
import axios from 'axios';
import {
  MdArrowOutward,
  MdUploadFile,
  MdDelete,
  MdDescription,
  MdQuiz,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const EducationalForm = () => {
  const [formType, setFormType] = useState("notes"); // 'notes' or 'papers'
  const [form_data, setform_data] = useState({
    typeFile:"",
    year: "",
    subject: "",
    term: "",
    description: "",
    totalChapters: "",
    totalQuestions: "",
    difficulty: "",
    studentYear: "",
    pdfFile: null,
  });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const yearOptions = ["First", "Second", "Third", "Fourth"];
  const termOptions = ["Insem", "Endsem"];
  const difficultyOptions = ["Easy", "Medium", "Hard"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setform_data((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (file) => {
    if (file && file.type === "application/pdf") {
      setform_data((prev) => ({
        ...prev,
        pdfFile: file,
      }));
    } else {
      alert("Please select a PDF file only");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setform_data((prev) => ({
      ...prev,
      pdfFile: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit =async () => {
    // Validate required fields
    const requiredFields = ["subject", "term", "description"];
    const yearField = formType === "notes" ? "year" : "studentYear";
    const specificField =
      formType === "notes" ? "totalChapters" : "totalQuestions";

    if (
      !form_data[yearField] ||
      !form_data.subject ||
      !form_data.term ||
      !form_data.description ||
      !form_data[specificField]
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (formType === "papers" && !form_data.difficulty) {
      alert("Please select difficulty level for question papers");
      return;
    }

    if (!form_data.pdfFile) {
      alert("Please upload a PDF file");
      return;
    }

    // Create the data object based on form type
    const submissionData = {
      id: Date.now(), // Simple ID generation
      year: formType === "papers" ? form_data.year : form_data.year,
      subject: form_data.subject,
      term: form_data.term,
      description: form_data.description,
      ...(formType === "notes"
        ? {
            totalChapters: parseInt(form_data.totalChapters),
          }
        : {
            totalQuestions: parseInt(form_data.totalQuestions),
            difficulty: form_data.difficulty,
            studentYear: form_data.studentYear,
            year: form_data.year || "2024",
          }),
    };

    console.log("Form Type:", formType);
    console.log("Submission Data:", submissionData);
    console.log("PDF File:", form_data.pdfFile);

    form_data.typeFile=formType;

    const formData=new FormData();
    formData.append("file",form_data.pdfFile)
    form_data.pdfFile=""
    formData.append("form_data",JSON.stringify(form_data))
    const result =await axios.post("http://localhost:3000/api/receive-file",formData,{
      headers:{"Content-Type":"mulipart/form-data"}
    })
    console.log(result)

    // Here you would typically upload the file and save the data
    alert(
      `${
        formType === "notes" ? "Notes" : "Question Paper"
      } submitted successfully!`
    );

    // Reset form
    setform_data({
      typeFile:"",
      year: "",
      subject: "",
      term: "",
      description: "",
      totalChapters: "",
      totalQuestions: "",
      difficulty: "",
      studentYear: "",
      pdfFile: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-12 px-4 relative">
      <div>
        <NavLink to={"/"} id="logo" className="absolute text-2xl sm:text-3xl lg:text-4xl font-semibold top-8 left-5"><FaArrowLeft /></NavLink>
      </div>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Upload <span className="italic font-light ">Content</span>
          </h1>
          <p className="text-xl text-gray-600">
            Share your educational resources with fellow students
          </p>
        </div>

        {/* Form Type Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-[4rem] bg-white rounded-full p-2 shadow-lg">
            <button
              onClick={() => setFormType("notes")}
              className={`px-8 cursor-pointer py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                formType === "notes"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <MdDescription /> Study Notes
            </button>
            <button
              onClick={() => setFormType("papers")}
              className={`px-8 py-3 rounded-full cursor-pointer font-medium transition-all duration-300 flex items-center gap-2 ml-2 ${
                formType === "papers"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <MdQuiz /> Question Papers
            </button>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Year Selection */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-700">
                {formType === "notes" ? "Academic Year" : "Student Year"}
              </label>
              <select
                name={formType === "notes" ? "year" : "studentYear"}
                value={
                  formType === "notes" ? form_data.year : form_data.studentYear
                }
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
              >
                <option value="">Select Year</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year} Year
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form_data.subject}
                onChange={handleInputChange}
                placeholder="e.g., Mathematics, Physics, Chemistry"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
              />
            </div>

            {/* Term */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-700">Term</label>
              <select
                name="term"
                value={form_data.term}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
              >
                <option value="">Select Term</option>
                {termOptions.map((term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                ))}
              </select>
            </div>

            {/* Conditional Fields */}
            {formType === "notes" ? (
              <div className="space-y-2">
                <label className="text-lg font-medium text-gray-700">
                  Total Chapters
                </label>
                <input
                  type="number"
                  name="totalChapters"
                  value={form_data.totalChapters}
                  onChange={handleInputChange}
                  min="1"
                  placeholder="e.g., 45"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-lg font-medium text-gray-700">
                    Total Questions
                  </label>
                  <input
                    type="number"
                    name="totalQuestions"
                    value={form_data.totalQuestions}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="e.g., 45"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-lg font-medium text-gray-700">
                    Difficulty Level
                  </label>
                  <select
                    name="difficulty"
                    value={form_data.difficulty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                  >
                    <option value="">Select Difficulty</option>
                    {difficultyOptions.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="lg:col-span-2 space-y-2">
                  <label className="text-lg font-medium text-gray-700">
                    Year/Session
                  </label>
                  <input
                    type="text"
                    name="year"
                    value={form_data.year}
                    onChange={handleInputChange}
                    placeholder="e.g., 2023, 2024"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                  />
                </div>
              </>
            )}
          </div>

          {/* Description */}
          <div className="mt-8 space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form_data.description}
              onChange={handleInputChange}
              rows="4"
              placeholder={
                formType === "notes"
                  ? "e.g., Calculus, Linear Algebra, Statistics"
                  : "e.g., Calculus, Linear Algebra, Differential Equations"
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* File Upload */}
          <div className="mt-8 space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Upload PDF
            </label>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                dragActive
                  ? "border-black bg-purple-50"
                  : "border-gray-300 hover:border-black"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {form_data.pdfFile ? (
                <div className="flex items-center justify-center gap-4">
                  <MdUploadFile className="text-4xl text-black" />
                  <div>
                    <p className="font-medium text-gray-800">
                      {form_data.pdfFile.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(form_data.pdfFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <MdDelete className="text-2xl" />
                  </button>
                </div>
              ) : (
                <div>
                  <MdUploadFile className="text-6xl text-gray-400 mx-auto mb-4" />
                  <p className="text-xl text-gray-600 mb-2">
                    Drag and drop your PDF here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF files only, max 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-12 text-center">
            <button
              onClick={handleSubmit}
              className="px-12 py-4 bg-white text-black border-2 rounded-full text-xl font-medium hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto group"
            >
              Upload {formType === "notes" ? "Notes" : "Question Paper"}
              <MdArrowOutward className="group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalForm;
