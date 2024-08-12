import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../utils/auth";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/Login", data).then((response) => {
        if (response.status === 200) {
          console.log("Request was successful", response.data);
          storeTokenInLS(response.data.token);
          navigate("/Dashboard");
        } else {
          console.log("Request failed", response);
        }
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
    reset();
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6 text-center">Login Form</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register("email")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
        <NavLink to="/" className="block text-center text-indigo-600 mt-4 hover:underline">
          <p>Signup</p>
        </NavLink>
      </form>
    </>
  );
}

export default Login;
