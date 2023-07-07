/* eslint-disable react/prop-types */
export default function Dialog(props) {
  const { clickHandler, id, setDialogState, setDeleteID } = props;

  return (
    <div className="fixed flex justify-center items-center w-full h-screen top-0 bg-opacity-50 bg-transparent">
      <div className="fixed flex flex-col bg-slate-200 p-20 rounded">
        <p className="text-center">Are you sure to delete?</p>
        <div className="flex ">
          <button
            className="px-6 py-2 bg-red-600 mt-5 rounded duration-200 ml-5"
            onClick={() => {
              clickHandler(id);
              setDialogState(false);
              setDeleteID(false);
            }}
          >
            Yes
          </button>
          <button
            className="px-6 py-2 bg-green-500 mt-5 rounded duration-200 ml-5"
            onClick={() => props.setDialogState(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
