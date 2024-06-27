"use client";
import axiosInstance from "@/app/helpers/axiosInstance";
import { Divider } from "@mui/material";
import { use, useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
export default function Page() {
  const [tickets, setTickets] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // fetch data
    axiosInstance
      .get("/tickets")
      .then((res) => {
        setTickets(res.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const tableHeaders = [
    "#",
    "Status",
    "Customer",
    "Priority",
    "Created",
    "Assigned",
    "Comments",
    "Tags",
    "Updated",
  ];

  return (
    <div>
      <div className="flex justify-between mb-4 px-4">
        <div className="text-3xl font-regular text-gray-500">Tickets</div>
        <div>Here will be the actions</div>
      </div>

      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 border-y-2 border-gray-200 ">
            <tr className="">
              <th
                scope="col"
                className="px-6 placeholder:text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-4 "
              >
                <input type="checkbox" />
              </th>
              {tableHeaders.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-4"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white ">
            {tickets?.map((ticket, index) => (
              <tr
                key={index}
                className="border-b-2 border-gray-200"
                onClick={() => router.push(`/tickets/${ticket?.uid}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[10px]">
                  <input type="checkbox" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[15px]">
                  T001{ticket.uid}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[40px]">
                  <button
                    style={{ backgroundColor: "#29b955" }}
                    className="p-1 px-2 text-white rounded-md ml-4"
                  >
                    {ticket.status.name[0].toUpperCase()}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[15px]">
                  {ticket?.client?.name || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[15px]">
                  {ticket?.priority?.name || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[15px]">
                  {moment(ticket.date).fromNow()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[15px]">
                  {ticket?.assignee?.name || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[15px]">
                  {ticket?.comments?.length || "0"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[15px]">
                  {ticket?.tags?.length ? (
                    <>
                      {ticket.tags.map((tag) => (
                        <div key={tag.id}>{tag.name}</div>
                      ))}
                    </>
                  ) : (
                    "0"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
