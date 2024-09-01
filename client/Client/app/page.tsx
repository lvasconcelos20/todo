"use client";
import React from "react";

import Login from "../src/pages/Login";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter(); // Use o roteador do Next.js para navegação

  const handleLoginSuccess = (email: string, password: string, username: string) => {
    router.push('../src/pages/home'); // Redireciona para a página Home
  };

  return (
    <>
      <Login onLoginSuccess={handleLoginSuccess} />
    </>
  );
}
