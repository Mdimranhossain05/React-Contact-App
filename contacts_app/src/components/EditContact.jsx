/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

export default function EditContact(props) {

  const location = useLocation();
  const contact = location.state?.contact;

  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);

  let navigate = useNavigate();

  const handleCange = (e) => {
    e.preventDefault();
    if (e.target.placeholder == "Name") {
      setName(e.target.value);
    } else if (e.target.placeholder == "Email") {
      setEmail(e.target.value);
    }
  };

  const update = (e) => {
    e.preventDefault();
    props.updateContactsHandler({ id:contact.id , name: name, email: email });
    setName("");
    setEmail("");
    navigate("/");
    
  };

  return (
    <div>
      <form className="m-5 border p-3 rounded" onSubmit={update}>
        <div className="flex flex-col mb-4">
          <label htmlFor="" className="mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            className="w-full bor border border-black p-2 rounded"
            value={name}
            onChange={handleCange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className="mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="w-full bor border border-black p-2 rounded"
            value={email}
            onChange={handleCange}
          />
        </div>
        <button className="px-4 py-2 bg-green-600 mt-3 rounded duration-200 hover:bg-green-700">
          Update
        </button>
      </form>
    </div>
  );
}
