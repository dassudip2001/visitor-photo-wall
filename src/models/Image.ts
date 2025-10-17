import mongoose, { Document } from "mongoose";

export interface IImage extends Document {
  dataURL: string;
  createdAt: Date;
}

const imageSchema = new mongoose.Schema<IImage>(
  {
    dataURL: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
export const Image = mongoose.model<IImage>("Image", imageSchema);
