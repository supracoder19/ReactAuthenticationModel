import { createContext, useContext,type ReactNode, useState } from "react";

// 1. Interface (Using PascalCase convention)
interface UserInfo {
  username: string;
  accessToken: string;
}

// 2. Initial state setup
const defaultUser: UserInfo = {
  username: "notFound",
  accessToken: "notFound"
};

const UserContext = createContext<UserInfo>(defaultUser);

// 3. Typed Context Provider Component
interface ProviderProps {
  children: ReactNode; // Properly type React children
}

const UserContextProvider = ({ children }: ProviderProps) => {
  // Optional: Add state here if you want to update user data dynamically
  const [user, setUser] = useState<UserInfo>(defaultUser);

  return (
    <UserContext.Provider value={user}>        
      {children}
    </UserContext.Provider>        
  );
};

// 4. Custom Hook to consume the context inside components
const useUser = () => {
  return useContext(UserContext);
};

export { UserContextProvider, useUser };
