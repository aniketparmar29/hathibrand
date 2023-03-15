import { useState, useEffect } from "react";

function Alert({ msg, bgColor }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {show && (
        <div
          className={`p-4 ${bgColor} text-white flex justify-between mt-4 w-1/2 lg:w-1/5 m-auto rounded-md p-2 relative`}
          role="alert"
        >
          <span>{msg}</span>
          <button
            onClick={() => setShow(false)}
            className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200 ml-4"
          >
            X
          </button>
        </div>
      )}
    </>
  );
}

export default Alert;
