import React, { useState, useEffect } from "react";

export default function Alert({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 100000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="mt-4 w-[50%] lg:w-[20%] m-auto bg-green-500 text-white rounded-md p-2 relative">
    <div className="h-1 w-full bg-white absolute bottom-0 left-0" />
    <div className="flex items-center justify-center">{message}</div>
  </div>
  );
}
