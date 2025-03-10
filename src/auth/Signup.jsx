import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.jpg";
import { account } from "../appwrite/appwrite";
import { v4 as uuidv4 } from "uuid";

function Signup({ closeModal, openLogin, setCurrentUser }) {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmit) {
      setFormErrors(validate(formValues));
    }
  }, [formValues, isSubmit]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {

      try {
        // Check if a session already exists
        const session = await account.getSession("current");

        if (session) {
          console.log("Existing session found. Logging out..");
          await account.deleteSession("current"); // Logout before signing up
        }
      } catch (error) {
        console.log("No active session, proceeding with signup...");
      }

      try {
        // await account.createAnonymousSession();
        const response = await account.create(
          uuidv4(),
          formValues.email,
          formValues.password,
          formValues.username
        );

        const newSession = await account.createEmailPasswordSession(formValues.email, formValues.password);
        console.log("New session created:", newSession);

        await account.createVerification("http://localhost:5173/verify")

        console.log("Signup Success:", response);
        // const user = await account.get()
        // console.log("Useer deetaik: ", user)
        alert("Signup successful! Please log in.");
        openLogin();
      } catch (error) {
        console.error("Signup Error:", error);
        alert("Signup failed! " + error.message);
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexName = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!values.username.trim()) {
      errors.username = "Username is required";
    } else if (!regexName.test(values.username)) {
      errors.username = "Write Full Name (First Last)";
    }

    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Enter a valid email";
    }

    if (!values.password.trim()) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!regexPassword.test(values.password)) {
      errors.password =
        "Password must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character";
    }

    return errors;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <div className="animate-slideIn bg-white flex w-[700px] md:w-[800px] rounded-xl shadow-xl relative">
        <div
          className="hidden md:flex flex-col justify-center items-center w-[65%] rounded-l-xl bg-cover bg-center relative"
          style={{ backgroundImage: `url(${loginImage})` }}
        ></div>
        <div className="w-full md:w-3/5 px-8 py-10">
          <button
            className="absolute top-3 right-4 text-gray-600 text-lg hover:text-black"
            onClick={closeModal}
          >
            ✖
          </button>
          <h1 className="text-3xl font-bold mb-6 text-black/80 text-center">
            Signup
          </h1>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="text-lg text-gray-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your full name"
                className="bg-gray-100 p-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={formValues.username}
              />
              <p className="text-red-600 text-sm mt-1">{formErrors.username}</p>
            </div>
            <div className="mb-6">
              <label className="text-lg text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="bg-gray-100 p-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={formValues.email}
              />
              <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
            </div>
            <div className="mb-6">
              <label className="text-lg text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="bg-gray-100 p-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={formValues.password}
              />
              <p className="text-red-600 text-sm mt-1">{formErrors.password}</p>
            </div>
            <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
              Signup
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-6 text-center">
            Already have an account?
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline ml-1"
              onClick={() => openLogin()}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
