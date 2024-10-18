import mongoose, { Schema, Document } from 'mongoose';

export interface Department extends Document {
    name: string;
  }
  
  const DepartmentSchema: Schema<Department> = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Department name is required'],
      unique: true,
      trim: true,
    },
  });
  
  const DepartmentModel =
    mongoose.models.Department ||
    mongoose.model<Department>('Department', DepartmentSchema);
  
  export default DepartmentModel;
  