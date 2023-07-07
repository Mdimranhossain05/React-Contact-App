/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FiTrash2 } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {BiEdit} from "react-icons/bi";

export default function ContactCard(props) {
  const { id, name, email, setDialogState, setDeleteID } = props;

  return (
    <div className="m-5 border rounded flex flex-row items-center justify-between">
      <Link to={`/${id}`} state={{ contact: { id, name, email } }}>
        <div className="p-4 flex flex-row items-center lg:w-[1000px] ">
          <FaUserAlt className="text-4xl text-white bg-slate-700 p-1 rounded-full mr-2" />

          <div className="flex flex-col">
            <p className="text-lg">{name}</p>
            <p className="t text-slate-8 00">{email}</p>
          </div>
        </div>
      </Link>

      <Link to={`/edit`} state={{contact: {id, name, email }}}>
      <BiEdit className="text-5xl text-col text-green-600 cursor-pointer hover:shadow-2xl duration-200 hover:bg-green-700 hover:text-white hover:scale-150 border rounded-full m-3 p-2"
      />
      </Link>

        <FiTrash2
        className="text-5xl text-col text-red-600 cursor-pointer hover:shadow-2xl duration-200 hover:bg-red-700 hover:text-white hover:scale-150 border rounded-full m-3 p-2"
        onClick={() => {
          setDialogState(true);
          setDeleteID(id);
        }}/>

    </div>
  );
}
