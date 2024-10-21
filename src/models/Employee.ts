import mongoose, { Schema, Document } from 'mongoose';

export interface Employee extends Document {
    name: string;
    email: string;
    designation: mongoose.Schema.Types.ObjectId; // Reference to Designation
    department: mongoose.Schema.Types.ObjectId; // Reference to Department
    casualLeavesUsed: number; // Count of used casual leaves in the current month
    sickLeavesUsed: number; // Count of used sick leaves
}

const EmployeeSchema: Schema<Employee> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Employee name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Employee email is required'],
        unique: true,
        trim: true,
    },
    designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designation',
        required: [true, 'Designation is required'],
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: [true, 'Department is required'],
    },
    casualLeavesUsed: {
        type: Number,
        default: 0,
    },
    sickLeavesUsed: {
        type: Number,
        default: 0,
    },
});

const EmployeeModel =
    mongoose.models.Employee ||
    mongoose.model<Employee>('Employee', EmployeeSchema);

export default EmployeeModel;
