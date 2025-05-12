import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider'; // import useAuth
import { Link } from "react-router-dom"

export default function Login() {
  const { register, handleSubmit,formState: { errors } } = useForm();
  const {authUser,setAuthUser} = useAuth();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    await axios.post("/api/user/login", userInfo)
      .then((response) => {
        console.log(response.data);
        alert("User login successfully");
        localStorage.setItem("messngaer", JSON.stringify(response.data));
      setAuthUser(response.data);// ✅ update context
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          alert("Something went wrong. Please try again.");
        }
      });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <form
        className="border border-black px-6 py-3 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold text-blue-600">Messenger</h1>
        <h2 className="text-center text-black text-2xl">
          Login With your <span className="text-blue-600 font-semibold">Account</span>
        </h2>

        {/* Email Input */}
        <label className="input input-bordered flex items-center m-2 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
          />
        </label>
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        {/* Password Input */}
        <label className="input input-bordered flex items-center m-2 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
          />
        </label>
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <div className="flex">
          <p className="text-black pt-2 mr-5">
            Don't have an Account?{" "}
            <Link to={"/signup"} className="text-blue-600 cursor-pointer underline">Signup</Link>
          </p>
          <input
            type="submit"
            value="Login"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
