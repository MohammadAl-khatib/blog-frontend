import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function getIsLoggedIn() {
      const response = await fetch("http://localhost:4000/profile", {
        credentials: "include",
      });
      const data = await response.json();
      setUserData(data);
    }
    getIsLoggedIn();
  }, []);

  return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
}
