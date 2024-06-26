/* eslint-disable react/display-name */
// components/withAuth.js
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./Loading";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
