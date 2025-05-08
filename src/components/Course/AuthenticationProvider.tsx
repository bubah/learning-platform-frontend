import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import oauthManager from "../../auth/SessionManager";
import { AuthContextType, LoginCredentials, User } from "../../types/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("This component needs to be used within an auth context");
  }
  return context;
};

type AuthProviderProps = React.PropsWithChildren<object>;

export const AuthenticationProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(oauthManager.getLoggedInUser());
    setLoading(false);
    setEmail(localStorage.getItem("email") || "");
  }, []);

  const login = (loginCredentials: LoginCredentials) => {
    if (!loginCredentials) {
      navigate("/login");
      return;
    }
    setEmail(loginCredentials.username);
    localStorage.setItem("email", loginCredentials.username);
    oauthManager.login(loginCredentials, location, (locationString: string) => {
      setUser(oauthManager.getLoggedInUser());
      navigate(locationString);
    });
  };

  const logout = () => {
    oauthManager.logout(() => {
      navigate("/login");
      setUser(null);
    });
  };

  const signUp = (loginCredentials: LoginCredentials) => {
    if (!loginCredentials) {
      navigate("/login");
      return;
    }
    setEmail(loginCredentials.username);
    localStorage.setItem("email", loginCredentials.username);
    oauthManager.signUp(loginCredentials, () => {
      navigate("/account-verify");
    });
  };

  return (
    <AuthContext.Provider
      value={{ signUp, user, email, authLoading: loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
