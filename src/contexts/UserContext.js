import { createContext, useEffect, useState } from "react";
import { API } from "../../constants";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function getIsLoggedIn() {
      const response = await fetch(`${API}/profile`, {
        credentials: "include",
      });
      const data = await response.json();
      setUserData(data);
    }
    getIsLoggedIn();
  }, []);

  return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
}
