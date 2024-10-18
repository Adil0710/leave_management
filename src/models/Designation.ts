import mongoose, { Schema, Document } from 'mongoose';

export interface Designation extends Document {
    name: string;
  }
  
  const DesignationSchema: Schema<Designation> = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Designation name is required'],
      unique: true,
      trim: true,
    },
  });
  
  const DesignationModel =
    mongoose.models.Designation ||
    mongoose.model<Designation>('Designation', DesignationSchema);
  
  export default DesignationModel;
  