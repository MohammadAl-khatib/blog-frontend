import Link from "next/link";
import React from "react";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

export default function Header() {
  const { userData, setUserData } = useContext(UserContext);
  const { name } = userData;

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {!name && (
          <>
            <li>
              <Link href="/login" onClick={() => setUserData({ name: "Mock User" })}>
                Login
              </Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
        {name && (
          <li>
            <Link href="/" onClick={() => setUserData({})}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
