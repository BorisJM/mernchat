import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { LoadingContext } from "./LoadingContext";

export const userContext = createContext();

function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [userPicture, setUserPicture] = useState("");
  const [id, setId] = useState(null);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    async function getProfile() {
      setIsLoading(true);
      const { data } = await axios
        .get("/api/user/getUser")
        .finally(() => setIsLoading(false));
      setUserPicture(data.picture);
      setId(data.userId);
      setUsername(data.username);
    }
    getProfile();
  }, [setIsLoading]);

  return (
    <userContext.Provider
      value={{ username, setUsername, id, setId, userPicture, setUserPicture }}
    >
      {children}
    </userContext.Provider>
  );
}

export default UserContextProvider;
