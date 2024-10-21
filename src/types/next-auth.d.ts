import "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    employeeId?: string;
    name?: string;
    email?: string;
    isAdmin?: boolean;
    department?: string;
    designation?: string;
  }
  interface Session {
    user: {
      _id?: string;
    employeeId?: string;
    name?: string;
    email?: string;
    isAdmin?: boolean;
    department?: string;
    designation?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    employeeId?: string;
    name?: string;
    email?: string;
    isAdmin?: boolean;
    department?: string;
    designation?: string;
  }
}

declare module "next-auth" {
  interface Profile {
    id: string; // Add this line to include the id
    name: string;
    email: string;
    picture: string;
    // Add any other properties you expect from the profile
  }
}
