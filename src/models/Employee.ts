import mongoose, { Schema, Document } from 'mongoose';

export interface Employee extends Document {
  employeeId: string;
  name: string;
  email: string;
  department?: string;
  designation?: string;
  profilePhoto?: string;
  isAdmin: boolean; // New field
  password: string; // Employee ID is used as password
}

const EmployeeSchema: Schema<Employee> = new mongoose.Schema({
  employeeId: {
    type: String,
    required: [true, 'Employee ID is required'],
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
  },
  profilePhoto: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false, // Regular employees are not admins by default
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

const EmployeeModel =
  mongoose.models.Employee ||
  mongoose.model<Employee>('Employee', EmployeeSchema);

export default EmployeeModel;
