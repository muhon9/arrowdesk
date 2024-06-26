"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import UserCard from "@/app/components/UserCard";
import axios from "axios";
import axiosInstance from "@/app/helpers/axiosInstance";
import { Button, Divider } from "@mui/material";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axiosInstance.get("/users").then((res) => {
      setUsers(res.data.results);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-3xl font-regular text-gray-500">Agents</div>
        <Button onClick={() => router.push("users/create")} variant="contained">
          Create
        </Button>
      </div>
      <Divider sx={{ marginY: 2 }} />
      <div className="flex gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
