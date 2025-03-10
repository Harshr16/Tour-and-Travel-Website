import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { account } from "../appwrite/appwrite";

function Verify() {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract userId and secret from the URL query params
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const secret = queryParams.get("secret");

  const handleVerify = async () => {
    setLoading(true);
    setError(null);
    try {
      await account.updateVerification(userId, secret);
      setVerified(true);
      setTimeout(() => navigate("/"), 3000); // Redirect after 3 seconds
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-2xl font-semibold mb-4">Verify Your Email</h1>
        {verified ? (
          <p className="text-green-600">Email verified successfully! Redirecting...</p>
        ) : (
          <>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              onClick={handleVerify}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Verify;
