/* eslint-disable react/prop-types */

import user from "../assets/user.jpeg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ContactDetails() {

  const location = useLocation();
  const contact = location.state?.contact;

  return (
    <div className="flex flex-col justify-center items-center min-h-[500px]  ">
      <div className="flex flex-col bg-white border border-gray-200 rounded-lg p-5 shadow">
        <div>
          <img src={user} alt="" className="w-[250px] rounded-lg" />
        </div>
        <div className="mt-3">
          <p className="text-center text-lg">Name: {contact.name}</p>
          <p className="text-center text-lg">Email: {contact.email}</p>
        </div>
      </div>

      <Link to="/">
        <button className="px-4 py-2 bg-blue-400 mt-5 rounded duration-200 hover:bg-blue-500 ml-5">
          Back to contact list
        </button>
      </Link>
    </div>
  );
}
