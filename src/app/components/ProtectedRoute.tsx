'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps { children: React.ReactNode; }

const allowedPaths = ["/guest", "/authorization", "/auth", "/"];

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const access = localStorage.getItem("access");
      const path = window.location.pathname;
      if (!access && !allowedPaths.includes(path)) {
        router.replace("/authorization");
      }
    }
  }, [router]);
  return <>{children}</>;
}