import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";
import axios from "../config/axios"
import { BsColumnsGap } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const {setUser} = useContext(userContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      console.log("Logging in...", formData);
      const res = await axios.post("/user/login",{
        emailOrPhone:formData.phone,
        password:formData.password
      },
    {withCredentials:true})
      setLoading(false)
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-white sm:bg-green-300">
      <div className="bg-white p-8 sm:rounded-lg sm:shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">LOGIN</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Email or Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 w-full"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={ handleChange }
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 w-full"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className={`bg-green-500 text-white font-bold py-2 rounded transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;