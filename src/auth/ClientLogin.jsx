import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.jpg";
import { account, databases } from "../appwrite/appwrite";
import hotelsData from "../data/hotel.json";
import { Query } from "appwrite";
import conf from "../configure/Config";

function ClientLogin({ closeModal, setCurrentUser }) {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
      setLoading(true);

      const validClient = hotelsData.find(hotel => hotel.client_email === formValues.email);
      if (!validClient) {
        setFormErrors({ email: "Email not found. Only registered clients can log in." });
        setLoading(false);
        return;
      }

      try {
        const existingSession = await account.getSession("current").catch(() => null);
        if (!existingSession) {
          await account.createEmailPasswordSession(formValues.email, formValues.password);
        }

        const user = await account.get();
        setCurrentUser(user);

        // Find client document in Appwrite instead of updating blindly
        const clientDocs = await databases.listDocuments(
          conf.appwriteDatabaseID,
          conf.appwriteClientCollectionID,
          [Query.equal("client_email", formValues.email)]
        );

        if (clientDocs.documents.length === 0) {
          console.error("Client not found in Appwrite collection.");
          alert("Client not found in the system.");
          setLoading(false);
          return;
        }

        const clientDoc = clientDocs.documents[0];

        await databases.updateDocument(
          conf.appwriteDatabaseID,
          conf.appwriteClientCollectionID,
          clientDoc.$id, // Use found document ID instead of user.$id
          { last_login: new Date().toISOString() } // Update only necessary fields
        );

        closeModal();
        navigate("/client-dashboard");
      } catch (error) {
        console.error("Login Error:", error.message);
        alert(error.message);
      }
      setLoading(false);
    }
  };


  const validate = (values) => {
    const errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email.trim()) errors.email = "Email is required"; 
    else if (!regexEmail.test(values.email)) errors.email = "Enter a valid email";
    if (!values.password.trim()) errors.password = "Password is required";
    else if (values.password.length < 8) errors.password = "Password must be at least 8 characters";
    return errors;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <div className="animate-slideIn bg-white flex w-[700px] md:w-[750px] rounded-xl shadow-xl relative">
        <div className="hidden md:flex flex-col justify-center items-center w-[60%] rounded-l-xl bg-cover bg-center relative" style={{ backgroundImage: `url(${loginImage})` }}></div>
        <div className="w-full md:w-3/5 px-8 py-10">
          <button className="absolute top-3 right-4 text-gray-600 text-lg hover:text-black" onClick={closeModal}>✖</button>
          <h1 className="text-3xl font-bold mb-6 text-black/80 text-center">Client Login</h1>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="text-lg text-gray-700 font-medium">Email</label>
              <input type="email" name="email" placeholder="Enter your email" className="bg-gray-100 p-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500" onChange={handleChange} value={formValues.email} />
              <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
            </div>
            <div className="mb-6">
              <label className="text-lg text-gray-700 font-medium">Password</label>
              <input type="password" name="password" placeholder="Enter your password" className="bg-gray-100 p-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500" onChange={handleChange} value={formValues.password} />
              <p className="text-red-600 text-sm mt-1">{formErrors.password}</p>
            </div>
            <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientLogin;
