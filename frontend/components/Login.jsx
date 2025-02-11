import React from 'react';

function Login() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-green-300">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">LOGIN</h1>
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter your number"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
