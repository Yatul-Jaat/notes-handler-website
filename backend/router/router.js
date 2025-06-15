import express, { json } from "express";
import upload from "../middleware/multer.js";
import dataModel from "../model/data.model.js";

const router_receive = express.Router();
const router_send_notes = express.Router();
const router_send_papers = express.Router();

router_receive.post(
  "/receive-file",
  upload.single("file"),
  async (req, res) => {
    const file_name = req.file.filename;
    const file_data = JSON.parse(req.body.form_data);
    file_data.pdfFile = file_name;
    console.log(file_data);
    const myModel = new dataModel({ ...file_data });
    await myModel.save();

    res.status(201).json({ status: "the data is uplaoded" });
  }
);

router_send_notes.get("/send-notes", async (req, res) => {
  const notes_model = await dataModel.find({ typeFile: "notes" });
  res.json(notes_model);
  console.log("data is sent...");
});
router_send_papers.get("/send-papers",async (req, res) => {
  const notes_model = await dataModel.find({ typeFile: "papers" });
  res.json(notes_model);
  console.log("data is sent...");
});

export { router_receive, router_send_notes, router_send_papers };
