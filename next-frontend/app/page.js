"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "./components/Loading";
// app/page.js

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, []);

  return <Loading />;
};

export default Home;
