import React from "react";
import AddEventForm from "../forms/AddEventForm";

function AddEventModalComponent({
  setOpen,
  open,
  selectedStartDate,
  isUserEvent,
}) {
  return (
    <dialog open={open}>
      <div
        className="h-screen w-screen fixed z-20 top-0 left-0 bottom-0 bg-black/50  "
        onClick={() => setOpen(false)}
      ></div>
      <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <AddEventForm
          setOpen={setOpen}
          open={open}
          selectedStartDate={selectedStartDate}
          isUserEvent={isUserEvent}
        />
      </div>
    </dialog>
  );
}

export default AddEventModalComponent;
