import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-600 border-solid h-12 w-12"></div>
    </div>
  );
};

export default Spinner;
