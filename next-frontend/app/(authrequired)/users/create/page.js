import React from "react";

export default function Page() {
  //create a form to register a new user field with email password and role

  return (
    <div className="w-full">
      <div className="w-1/2">
        <div className="text-3xl font-regular text-gray-500 mb-4">
          Create User
        </div>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="border p-2 w-full rounded-md"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border p-2 w-full rounded-md"
              placeholder="Password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-600 font-semibold mb-2"
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              className="border p-2 w-full rounded-md"
              placeholder="Role"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
