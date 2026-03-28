import mongoose, { Schema, model, models } from "mongoose";

const newYadiSchema = new Schema(
  {
    sr: String,
    house: String,
    name: String,
    relation: String,
    relative: String,
    gender: String,
    age: String,
    epic: String,
    _page: Number,
    _file: String,
  },
  { timestamps: true }
);

// ⚡ IMPORTANT: Add indexes for FAST search
newYadiSchema.index({
  epic: "text",
  house: "text",
  name: "text",
  relative: "text",
  relation: "text",
});

// CORRECT MODEL DEFINITION
const newYadi = models.newYadi || model("newYadi", newYadiSchema);

export default newYadi;
