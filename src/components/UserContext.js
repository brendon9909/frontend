import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null)
  const [task, setTask] = useState(null)

  return (
    <UserContext.Provider value={{ token, setToken, username, setUsername, task, setTask }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
