/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import Dialog from "./Dialog";
import { useRef } from "react";

export default function ContactList(props) {
  const { contacts, term, searchKeyword } = props;
  // console.log(props);
  const inputEl = useRef();

  const [dialogState, setDialogState] = useState(false);
  const [deleteID, setDeleteID] = useState("");

  const deleteContactHolder = (id) => {
    setDialogState(true);
    props.getContactID(id);
  };

  const renderList = contacts.map((contact, index) => {
    return (
      <ContactCard
        contact={contact}
        id={contact.id}
        name={contact.name}
        email={contact.email}
        setDialogState={setDialogState}
        key={index}
        setDeleteID={setDeleteID}
      />
    );
  });
  const getSearchTerm = () => {
    searchKeyword(inputEl.current.value);
  };

  return (
    <div>
      {dialogState ? (
        <Dialog
          setDialogState={setDialogState}
          clickHandler={deleteContactHolder}
          setDeleteID={setDeleteID}
          id={deleteID}
        />
      ) : (
        <></>
      )}

      <div className="relative m-5">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Search Here"
          ref={inputEl}
          value={term}
          onChange={getSearchTerm}
        ></input>
      </div>

      <div className="w-screen">{renderList.length > 0 ? renderList : <p className="p-5">No contact available</p>}</div>

      <Link to="/add">
        <button className="px-4 py-2 bg-green-600 mt-3 rounded duration-200 hover:bg-green-700 ml-5">
          Add Contact
        </button>
      </Link>
    </div>
  );
}
