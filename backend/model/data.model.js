import mongoose, { Schema } from "mongoose";

const myModel = new Schema({
  typeFile: { type: String, required: true },
  year: { type: String },
  subject: { type: String, required: true },
  term: { type: String, required: true },
  description: { type: String },
  totalChapters: { type: String, default: 0 },
  totalQuestions: { type: String, default: 0 },
  difficulty: { type: String },
  studentYear: { type: String },
  pdfFile: { type: String, default: "" },
});

const dataModel = mongoose.model("dataModel", myModel);

export default dataModel;

/*
      year: "",
      subject: "",
      term: "",
      description: "",
      totalChapters: "",
      totalQuestions: "",
      difficulty: "",
      studentYear: "",
      pdfFile: null,
*/
