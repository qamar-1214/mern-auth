import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //Onchange handle function
  const handleOnchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  //handle form submit function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const response = await axios.post(
        `${apiBaseUrl}/api/user/signup`,
        formData
      );

      // Check if the response and response.data exist
      if (response && response.data) {
        console.log("User signed up:", response.data);
        // Display success toast
        toast.success(response.data.message || "User signed up successfully!");

        // You can also clear form or redirect as needed
        navigate("/sign-in");
      } else {
        setError(true);
        console.error("No response data received");
        toast.error("No response data received");
      }
    } catch (error) {
      setError(true);

      if (error.response && error.response.data) {
        console.error("There was an error signing up:", error.response.data);
        toast.error(
          error.response.data.message || "There was an error signing up"
        );
      } else {
        console.error("An unknown error occurred:", error.message);
        toast.error("An unknown error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Always stop loading spinner
    }
  };

  return (
    <div className="h-screen p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <div className="p-3">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <input
              type="text"
              placeholder="username"
              id="username"
              onChange={handleOnchange}
              className="bg-slate-100 p-3 outline-none rounded-lg w-full"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="email"
              id="email"
              onChange={handleOnchange}
              className="bg-slate-100 p-3 outline-none rounded-lg w-full"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleOnchange}
              className="bg-slate-100 p-3 outline-none rounded-lg w-full"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 transition-all duration-300 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <div>
          <p className="flex gap-2 mt-5">
            Have an account?
            <Link to={"/sign-in"}>
              <span className="text-blue-500">Sign In</span>
            </Link>
          </p>
        </div>
        <p className="text-red-600 mt-5">{error && "Something went wrong!"}</p>
      </div>
    </div>
  );
};

export default SignUp;
