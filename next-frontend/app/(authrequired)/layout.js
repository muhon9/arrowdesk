"use client";
import Sidebar from "../components/Sidebar";
import withAuth from "../components/withAuth";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default withAuth(AuthLayout);
