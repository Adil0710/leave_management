import mongoose, { Schema, Document } from 'mongoose';
export interface LeaveRequest extends Document {
    employee: mongoose.Schema.Types.ObjectId;
    fromDate: Date;
    toDate: Date;
    reason: string;
    leaveType: string; // e.g., Sick Leave, Casual Leave, etc.
    status: 'pending' | 'approved' | 'rejected';
  }
  
  const LeaveRequestSchema: Schema<LeaveRequest> = new mongoose.Schema({
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: [true, 'Employee is required'],
    },
    fromDate: {
      type: Date,
      required: [true, 'From date is required'],
    },
    toDate: {
      type: Date,
      required: [true, 'To date is required'],
    },
    reason: {
      type: String,
      required: [true, 'Reason for leave is required'],
    },
    leaveType: {
      type: String,
      required: [true, 'Leave type is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  });
  
  const LeaveRequestModel =
    mongoose.models.LeaveRequest ||
    mongoose.model<LeaveRequest>('LeaveRequest', LeaveRequestSchema);
  
  export default LeaveRequestModel;
  