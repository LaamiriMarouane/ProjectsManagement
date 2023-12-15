import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useDispatch, useSelector } from "react-redux";
import AddEventModalComponent from "../../../components/userComponents/AddEventModalComponent";
import { useParams } from "react-router-dom";
import { getProjectEvents } from "../../../../features/events/PorjectEventSlice";
import Spinner from "../../../components/tools/Spinner";
function ProjectEventsPage() {
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const dispatch = useDispatch();
  const { projectEvents, loading } = useSelector(
    (store) => store.projectEvents
  );
  const { id } = useParams();
  const handleDateClick = (selected) => {
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    setAddEventModalOpen(true);
    setSelectedStartDate(selected.startStr);
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };
  useEffect(() => {
    dispatch(getProjectEvents(id));
  }, []);

  return (
    <div className="h-[calc(100%-100px)]">
      <div>
        {loading ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
            <Spinner />
          </div>
        ) : (
          <FullCalendar
            height="90vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            // loading={true}
            //eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={projectEvents}
          />
        )}
      </div>
      <div>
        <AddEventModalComponent
          setOpen={setAddEventModalOpen}
          open={addEventModalOpen}
          selectedStartDate={selectedStartDate}
          isUserEvent={false}
        />
      </div>
    </div>
  );
}

export default ProjectEventsPage;
