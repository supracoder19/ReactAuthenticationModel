import { createContext, useContext,type ReactNode, useState, type SetStateAction, type Dispatch } from "react";
import {publicApiClient} from "./AxiosClients";
import { useNavigate } from "react-router";

interface UserInfo {
  username: string|null;
  accessToken: string|null;
  logout: (navigate : any)=>void;
}

// 1. Create a new interface that describes the full Context structure
interface UserContextType {
  user: UserInfo;
  setUser: Dispatch<SetStateAction<UserInfo>>; // Types the useState setter function
}

const defaultUser: UserInfo = {
  username: null,
  accessToken: null,
  logout:async (navigate)=>{
    try {
      await publicApiClient.post("/logout")
    } catch (error) {
      console.log(error)
    }
    finally{
      navigate("/")
    }
  }
};

// 2. Initialize the context with the new type (allowing undefined initially is safest here)
const UserContext = createContext<UserContextType | undefined>(undefined);

// 3. Typed Context Provider Component
interface ProviderProps {
  children: ReactNode; // Properly type React children
}

const UserContextProvider = ({ children }: ProviderProps) => {
  // Optional: Add state here if you want to update user data dynamically
  const [user, setUser] = useState<UserInfo>(defaultUser);

  return (
    <UserContext.Provider value={{user,setUser}}>        
      {children}
    </UserContext.Provider>        
  );
};

// 4. Custom Hook to consume the context inside components
const useUser = () => {
  return useContext<UserContextType | undefined>(UserContext);
};

export { UserContextProvider, useUser };
