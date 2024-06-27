import React from "react";
import moment from "moment";
import Avatar from "@mui/material/Avatar";

export default function TicketCommentSection({ ticket }) {
  const { tags, subject, issue, comments, owner, date } = ticket;

  function formatDate(date) {
    return moment(date).calendar(null, {
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      nextWeek: "MMM D, YYYY, hh:mma",
      lastDay: "[Yesterday at] LT",
      lastWeek: "MMM D, YYYY, hh:mma",
      sameElse: "L",
    });
  }

  return (
    <div className="bg-white shadow  p-6 flex items-start space-x-4">
      <Avatar
        sx={{
          //   bgcolor: red[500],
          border: 2,
          width: 56,
          height: 56,
          marginBottom: 2,
        }}
      >
        {owner?.name[0].toUpperCase()}
      </Avatar>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">{owner.name}</p>
            <p className="text-xs text-gray-500">{formatDate(date)}</p>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v16h16V4H4zM4 12h16"
              ></path>
            </svg>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l-12 12m0-12l12 12"
              ></path>
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{subject}</h2>
          <p className="mt-2 text-gray-700">{issue}</p>
        </div>
        <div className="mt-4">
          {tags &&
            tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs font-semibold mr-2"
              >
                #{tag.name}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
