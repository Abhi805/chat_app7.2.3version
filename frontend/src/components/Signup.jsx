import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider"; // Example path
import { Link } from "react-router-dom"

export default function Signup() {
  
  const {authUser,setAuthUser} = useAuth();
  const {
    register,
    handleSubmit,       
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {

    const userInfo = {
      name: data.username,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmPassword 
    };
   await axios.post("/api/user/signup", userInfo)
      .then((response) => {
        console.log(response.data);
        alert("User created successfully");
        localStorage.setItem("messenger",JSON.stringify(response.data));
        setAuthUser(response.data);
       })
        .catch((error) => {
        console.log(error);
        alert("Error creating user",error);
        }
      );
  };


  // Watch the password value to compare with confirmPassword
  const password = watch("password");

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <form
        className="border border-black px-6 py-3 rounded w-full max-w-md bg-white shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-2">
          Messanger
        </h1>
        <h2 className="text-center text-black text-xl mb-4">
          Create a new{" "}
          <span className="text-blue-600 font-semibold">Account</span>
        </h2>

        {/* Username */}
        <label className="input input-bordered flex items-center m-2 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
          />
        </label>
        {errors.username && (
          <p className="text-red-600 ml-3 text-sm">{errors.username.message}</p>
        )}

        {/* Email */}
        <label className="input input-bordered flex items-center m-2 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
        </label>
        {errors.email && (
          <p className="text-red-600 ml-3 text-sm">{errors.email.message}</p>
        )}



        {/* Password */}
        <label className="input input-bordered flex items-center m-2 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
        </label>
        {errors.password && (
          <p className="text-red-600 ml-3 text-sm">{errors.password.message}</p>
        )}

        {/* Confirm Password */}
        <label className="input input-bordered flex items-center m-2 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
        </label>
        {errors.confirmPassword && (
          <p className="text-red-600 ml-3 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-black text-sm">
            Have an Account?{" "}
            <Link to={"/login"} className="text-blue-600 cursor-pointer underline">
              Login
            </Link>
          </p>
          <input type="submit" value="Signup" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
