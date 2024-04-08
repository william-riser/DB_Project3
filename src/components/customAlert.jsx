const CustomAlert = ({ message, onClose }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md flex flex-col items-center">
          <p className="text-lg font-semibold mb-4">{message}</p>
          <button
            className="bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none mt-4"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  

  export default CustomAlert;