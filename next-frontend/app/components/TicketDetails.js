import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axiosInstance from "../helpers/axiosInstance";

export default function TicketDetails({ ticket }) {
  const [ticketStatus, setTicketStatus] = useState([]);
  const [ticketPriority, setTicketPriority] = useState("Normal");

  const [selectedTicketStatus, setSelectedTicketStatus] = useState({
    name: "New",
    htmlColor: "#29b955",
  }); // [1
  // Assuming you have a state for ticket status
  const [showDropdown, setShowDropdown] = useState(false);

  const { tags, status, priority, date, uid, assignee } = ticket;

  useEffect(() => {
    setSelectedTicketStatus(status);
    axiosInstance
      .get("/ticketstatus")
      .then((res) => {
        // console.log(res.data);
        setTicketStatus(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleTicketStatusChange(status) {
    setSelectedTicketStatus(status);
    setShowDropdown(false); // Close dropdown after selection
  }

  const handlePriorityChange = (event) => {
    setTicketPriority(event.target.value);
  };

  return (
    <div className="w-1/3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Ticket <span className="text-gray-500">#{`${uid}`}</span>
        </h2>

        <div className="relative">
          <button
            style={{ backgroundColor: selectedTicketStatus.htmlColor }}
            className=" text-white text-center font-semibold py-2 w-24 px-4 rounded inline-flex items-center"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {selectedTicketStatus.name}
            <svg
              className="fill-current h-4 w-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </button>
          {showDropdown && (
            <div className="origin-top-right absolute right-0 mt-2 w-24  shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="" role="menu" aria-orientation="vertical">
                {ticketStatus.map((status) => (
                  <button
                    key={status.id}
                    style={{ backgroundColor: status.htmlColor }}
                    onClick={() => handleTicketStatusChange(status)}
                    className="block px-4 py-2 text-sm  hover:bg-gray-100 w-full text-left text-white"
                    role="menuitem"
                  >
                    {status.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="shadow px-4 py-4 rounded-md mt-4 ">
        <div className="my-4">
          <div className="text-sm text-gray-600">Assignee</div>
          <div className="text-gray-800">
            {assignee ? `${assignee.name}` : "No User Assigned"}
          </div>
        </div>

        <div className="my-4">
          <div className="text-sm text-gray-600 mb-2">Priority</div>
          <select
            value={priority}
            onChange={handlePriorityChange}
            className="border border-gray-300 rounded-md text-gray-800 p-2"
          >
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        <div className="my-4">
          <div className="text-sm text-gray-600">Group</div>
          <div className="text-gray-800">Home User</div>
        </div>
        <div className="my-4">
          <div className="text-sm text-gray-600">Tags</div>
          <div className="text-gray-800">
            {tags &&
              tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs font-semibold mr-2"
                >
                  {tag.name}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
