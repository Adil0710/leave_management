import dbConnect from "@/lib/dbConnect";
import EmployeeModel from "@/models/Employee";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const {
      employeeId,
      name,
      email,
      department,
      designation,
      profilePhoto,
      isAdmin,
    } = await request.json();

    // Check if the employee with the same email or employeeId exists
    const existingEmployee = await EmployeeModel.findOne({
      $or: [{ email }, { employeeId }],
    });

    if (existingEmployee) {
      // Determine if the conflict is with the email or employeeId
      let message = "Employee already exists";
      if (existingEmployee.email === email) {
        message = "Employee already exists with the provided email ID";
      } else if (existingEmployee.employeeId === employeeId) {
        message = "Employee already exists with the provided employee ID";
      }

      return Response.json({
          success: false,
          message,
        },
        {
          status: 400,
        }
      );
    }


    // Hash the password
    const hashedPassword = await bcrypt.hash(employeeId, 10);


    const newEmployee = new EmployeeModel({
        employeeId,
        name,
        email,
        department,
        designation,
        profilePhoto,
        isAdmin,
        password: hashedPassword,
      });

      await newEmployee.save();


      return Response.json(
        {
          success: true,
          message: "Employee added successfully.",
        },
        { status: 201 }
      );

  } catch (error) {
    console.error("Error adding employee", error);
    return Response.json(
      {
        success: false,
        message: "Error adding employee",
      },
      {
        status: 500,
      }
    );
  }
}
