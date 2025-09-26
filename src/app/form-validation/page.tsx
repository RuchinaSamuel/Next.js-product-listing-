"use client"

import { useState } from "react"

export default function FormValidation(){
  const [validated, setValidated] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleEdit = (e) => {
    setValidated({
      ...validated,
      [e.target.name]: e.target.value,
    });
  };

  const checkFormInput = () => {
    const newErrors = {};

    if (!validated.fName.trim()) newErrors.fName = "First name is required";
    if (!validated.lName.trim()) newErrors.lName = "Last name is required";

    if (!validated.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validated.email)) {
      newErrors.email = "Please enter a valid email";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(validated.password)) {
      newErrors.password = "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
    }

    if (!validated.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (validated.confirmPassword !== validated.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const ConfirmSubmit = (e) => {
    e.preventDefault();
    const confirmErrors = checkFormInput();

    if (Object.keys(confirmErrors).length > 0) {
      setErrors(confirmErrors);
      setSubmittedData(null);
    } else {
      setErrors({});
      setSubmittedData(validated);
      setValidated({ fName:"", lName:"", email:"", password:"", confirmPassword:"" });
    }
  };

  return (
    <div className="mx-auto w-1/2 mt-20">
      <form onSubmit={ConfirmSubmit} className="w-[600px] border border-gray-400 p-6">
        
        {/* First Name */}
        <div>
          <label className="font-bold text-lg">First Name:</label>
          <input 
            type="text"
            name="fName"
            value={validated.fName}
            onChange={handleEdit}
            className="w-full border border-gray-400 outline-none p-2 rounded-sm"
          />
          <p className="text-red-800">{errors.fName}</p>
        </div>

        {/* Last Name */}
        <div className="mt-4">
          <label className="font-bold text-lg">Last Name:</label>
          <input 
            type="text"
            name="lName"
            value={validated.lName}
            onChange={handleEdit}
            className="w-full border border-gray-400 outline-none p-2 rounded-sm"
          />
          <p className="text-red-800">{errors.lName}</p>
        </div>

        {/* Email */}
        <div className="mt-4">
          <label className="font-bold text-lg">Email:</label>
          <input 
            type="text"
            name="email"
            value={validated.email}
            onChange={handleEdit}
            className="w-full border border-gray-400 outline-none p-2 rounded-sm"
          />
          <p className="text-red-800">{errors.email}</p>
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="font-bold text-lg">Password:</label>
          <input 
            type="password"
            name="password"
            value={validated.password}
            onChange={handleEdit}
            className="w-full border border-gray-400 outline-none p-2 rounded-sm"
          />
          <p className="text-red-800">{errors.password}</p>
        </div>

        {/* Confirm Password */}
        <div className="mt-4">
          <label className="font-bold text-lg">Confirm Password:</label>
          <input 
            type="password"
            name="confirmPassword"
            value={validated.confirmPassword}
            onChange={handleEdit}
            className="w-full border border-gray-400 outline-none p-2 rounded-sm"
          />
          <p className="text-red-800">{errors.confirmPassword}</p>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-center mt-4">
          <button className="font-semibold bg-green-700 text-white p-2 rounded-sm">Submit</button>
        </div>
      </form>

      {/* Submitted Data */}
      {submittedData && (
        <div className="w-[600px] bg-gray-200 p-4 rounded mt-4">
          <p className="font-bold">✅ Submitted Successfully</p>
          <p><strong>First Name:</strong> {submittedData.fName}</p>
          <p><strong>Last Name:</strong> {submittedData.lName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
        </div>
      )}
    </div>
  )
}
