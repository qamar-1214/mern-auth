import { useEffect, useState } from "react";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Onchange handle function
  const handleOnchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  //handle form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await axios.post(
        `${apiBaseUrl}/api/user/signin`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response && response.data) {
        if (response.data.success) {
          navigate("/");
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        dispatch(signInFailure(true));

        toast.error("No response data recieved.");
      }
      console.log(response.data.data);
      dispatch(signInSuccess(response.data.data));
    } catch (error) {
      dispatch(signInFailure(error.response.data.data));
      // // Log the full error object to understand its structure
      // console.log("Full error object:", error);
      // if (error.response) {
      //   // Log error.response and error.response.data to inspect what is being returned
      //   console.log("error.response:", error.response);
      //   console.log("error.response.data:", error.response.data);
      //   if (error.response.data && error.response.data.message) {
      //     console.log("Error while signing in:", error.response.data.message);
      //     toast.error(error.response.data.message);
      //   } else {
      //     // If no specific message, show the status or fallback error
      //     toast.error(error.response.statusText || "An error occurred");
      //   }
      // } else if (error.message) {
      //   // For network errors or other unknown issues
      //   console.log("An unknown error occurred:", error.message);
      //   toast.error(error.message);
      // } else {
      //   console.log("Unexpected error format:", error);
      //   toast.error("An unexpected error occurred.");
      // }
    }
  };

  return (
    <div className="h-screen p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <div className="p-3">
        <form onSubmit={handleSubmit} className="grid gap-4">
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
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>
        <div>
          <p className="flex gap-2 mt-5">
            Don't Have an account?
            <Link to={"/sign-up"}>
              <span className="text-blue-500">Sign Up</span>
            </Link>
          </p>
        </div>
        <p className="text-red-600 mt-5">
          {error ? error.message || "Something went wrong!" : ""}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
