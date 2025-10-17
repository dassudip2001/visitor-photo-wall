import mongoose, { Document } from "mongoose";

export interface IImage extends Document {
  dataURL: string;
  clientId?: number;
  place?: string;
  createdAt: Date;
}

const imageSchema = new mongoose.Schema<IImage>(
  {
    dataURL: { type: String, required: true },
    clientId: { type: Number, required: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
export const Image = mongoose.model<IImage>("Image", imageSchema);
