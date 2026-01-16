"use client";

import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminDashboard = () => {
  const router = useRouter();
  const { isLoggedIn, userRole, isLoading } = useAuthStore();

  useEffect(() => {
    if (isLoading) return;
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
    if (isLoggedIn && userRole !== "Admin") {
      router.push("/");
    }
  }, [isLoading, isLoggedIn, userRole, router]);

  // Show loading or unauthorized message while redirecting
  if (isLoading) {
    return (
      <section id="page">
        <h1>Loading...</h1>
      </section>
    );
  }

  if (isLoggedIn && userRole !== "Admin") {
    return (
      <section id="page">
        <h1>Not Authorized</h1>
        <p>You are not authorized to access this page</p>
        <a href="/">Go back to home</a>
      </section>
    );
  }

  return (
    <section id="page">
      <h1>Welcome!</h1>
      <div>Admin Dashboard</div>
      <a href="/auth/logout">Logout</a>
    </section>
  );
};

export default AdminDashboard;
