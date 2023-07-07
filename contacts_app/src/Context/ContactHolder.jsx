/* eslint-disable no-unused-vars */
import Header from "../components/Header";
import AddContact from "../components/AddContact";
import ContactList from "../components/ContactList";
import { useState } from "react";
import { useEffect } from "react";
import uuid from "react-uuid";
import api from "../api/contacts";
import ContactDetails from "../components/ContactDetails";
import EditContact from "../components/EditContact";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  RouterProvider,
  Routes,
  NavLink,
} from "react-router-dom";

export default function ContactHolder() {

  const [contacts, setContacts] = useState([]); //the main contact list
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const addContactsHandler = async (contact) => {
    const request = { id: uuid(), ...contact };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data])
  };

  const removeContactHandler = async (id) => {
    const response = await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter( (contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }

  const updateContactsHandler = async (contact)=>{
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const {id, name, email} = response.data;
    setContacts(contacts.map( (contact) => {
      return contact.id === id ? {...response.data} : contact ;
    } ))
  }

  const searchHandler = (keyword)=>{
    setSearchTerm(keyword);
    
    if(keyword !== ""){
      const newContactList = contacts.filter((contact)=>{
        return Object.values(contact).join(" ").toLowerCase().includes(keyword.toLowerCase() );
      });
      setSearchResult(newContactList);
    }else{
      setSearchResult(contacts)
    }


  }

  const fetchContacts = async () => {
    const resposnse = await api.get("/contacts");
    return resposnse.data;
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await fetchContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route
          path="/"
          element={
            <ContactList
              getContactID={removeContactHandler}
              contacts={searchTerm.length < 1 ? contacts : searchResult}
              term = {searchTerm}
              setTerm = {setSearchTerm}
              searchKeyword = {searchHandler}
            />
          }
        />
        <Route path="/:id" element={<ContactDetails />} />

        <Route
          path="/add"
          element={<AddContact addContactsHandler={addContactsHandler} />}
        />

        <Route path="/edit" element={<EditContact updateContactsHandler={updateContactsHandler}/>}/>
      </Route>
    )
  );

  return (
    <>
      <Header />
      <RouterProvider router={Router} />
    </>
  );
}

const Root = () => {
  return (
    <>
      <div className="flex justify-center">
        <ul className="flex mt-4">
          <li>
            <NavLink
              className="px-7 border border-green-600 p-2 mr-2 rounded hover:bg-green-600"
              to="/"
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              className="border border-green-600 p-2 mr-2 rounded hover:bg-green-600"
              to="/add"
            >
              Add Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};
