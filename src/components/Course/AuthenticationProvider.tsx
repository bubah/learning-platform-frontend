import { createContext, useContext, useState } from "react";
import { AuthContextType, LoginCredentials } from "../../types/types";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext<AuthContextType>({user:null,login:() => {},logout:() => {}});


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("This component needs to be used within an auth context");
  }
  return context;
};

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<LoginCredentials | null>(null);
  const navigate = useNavigate();

  const login = (user: LoginCredentials) => {
    setUser(user);
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
