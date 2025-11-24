import mongoose, { Schema, model, models } from "mongoose";

const yadiSchema = new Schema(
  {
    sno: Number,
    address_original: String,
    address: String,
    name_original: String,
    name: String,
    father_or_husband_original: String,
    father_or_husband: String,
    gender: String,
    age: String,
    voter_id: String,
    id: String,
    _raw_line: String,
    page: Number,
    ward: String,
    file_name: String,
  },
  { timestamps: true }
);

// ⚡ IMPORTANT: Add indexes for FAST search
yadiSchema.index({
  voter_id: "text",
  address: "text",
  address_original: "text",
  name: "text",
  name_original: "text",
  father_or_husband: "text",
  father_or_husband_original: "text",
  _raw_line: "text"
});

// CORRECT MODEL DEFINITION
const Yadi = models.Yadi || model("Yadi", yadiSchema);

export default Yadi;
