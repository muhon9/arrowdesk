"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/helpers/axiosInstance";
import TicketDetails from "@/app/components/TicketDetails";
import Loading from "@/app/components/Loading";
import TicketCommentSection from "@/app/components/TicketCommentSection";

function CommentSection() {}

export default function Page({ params: { ticketId } }) {
  const router = useRouter();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/tickets/${ticketId}`)
      .then((res) => {
        setTicket(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [ticketId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-start">
        <TicketDetails ticket={ticket} />
        <div className="w-full ml-4">
          <TicketCommentSection ticket={ticket} />
        </div>
      </div>
    </div>
  );
}
