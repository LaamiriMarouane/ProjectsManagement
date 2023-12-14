// import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ColorPickerModal from "../userComponents/ColorPickerModalComponent";
import { useDispatch } from "react-redux";
import { PostUserEvent } from "../../../features/events/UserEventsSlice";
import { PostProjectEvent } from "../../../features/events/PorjectEventSlice";
import { useParams } from "react-router-dom";

const AddEventForm = ({ setOpen, selectedStartDate, isUserEvent }) => {
  const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false);
  const [eventColor, setEventColor] = useState("purple");
  const { id } = useParams();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const handleFormSubmit = (values) => {
    const formData = {
      ...values,
      color: eventColor,
    };
    if (isUserEvent) {
      dispatch(PostUserEvent(formData));
    } else {
      dispatch(PostProjectEvent({ projectId: id, formData }));
    }
    reset();
    setOpen(false);
  };

  useEffect(() => {
    setValue("start", selectedStartDate);
  }, [selectedStartDate, setValue]);
  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="max-w-xl mx-auto bg-white px-8 py-5 rounded-xl shadow-sm shadow-blue-600"
      >
        <div className="flex w-full items-center justify-center mb-2 text-2xl font-bold">
          Add Event
        </div>
        <div className="flex items-center gap-5 justify-center">
          <div className="mb-1 w-full">
            <label className="block text-gray-900 text-xs font-bold mt-3 mb-2">
              Title
            </label>
            <input
              className=" appearance-none outline-none bg-transparent font-medium text-sm w-full py-1 px-2 textgray-700 leading-tight border-b border-gray-400"
              type="text"
              placeholder="ex: meeting"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-sm font-medium text-red-500">
                Title is required
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5 justify-center">
          <div className="mb-1 w-full">
            <label className="block text-gray-900 text-xs font-bold mt-3 mb-2">
              StartDate
            </label>
            <input
              className=" appearance-none outline-none bg-transparent font-medium text-sm w-full py-1 px-2 textgray-700 leading-tight border-b border-gray-400"
              type="date"
              value={selectedStartDate}
              onChange={(e) => setValue("start", e.target.value)}
              {...register("start", { required: true })}
            />
            {errors.start && (
              <span className="text-sm font-medium text-red-500">
                StartDate required
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5 justify-center">
          <div className="mb-1 w-full">
            <label className="block text-gray-900 text-xs font-bold mt-3 mb-2">
              EndDate
            </label>
            <input
              className=" appearance-none outline-none bg-transparent font-medium text-sm w-full py-1 px-2 textgray-700 leading-tight border-b border-gray-400"
              type="date"
              {...register("end", { required: true })}

              //showDaysOutsideCurrentMonth
            />
            {errors.end && (
              <span className="text-sm font-medium text-red-500">
                StartDate required
              </span>
            )}
          </div>
        </div>

        <div
          className="w-4 h-4 m-2 rounded"
          style={{ backgroundColor: eventColor }}
          onClick={() => setColorPickerModalOpen(true)}
        ></div>
        <div className="flex items-center gap-5 justify-center">
          <button
            type="submit"
            className="text-white py-2 px-4 rounded w-full  focus:outline-none focus:shadow-outline-blue bg-btn"
            disabled={!isValid || isSubmitting}
          >
            Add Event
          </button>
        </div>
      </form>

      <ColorPickerModal
        open={colorPickerModalOpen}
        setOpen={setColorPickerModalOpen}
        setEventColor={setEventColor}
        color={eventColor}
      />
    </>
  );
};

export default AddEventForm;
