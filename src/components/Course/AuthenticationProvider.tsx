import { CognitoUserSession } from "amazon-cognito-identity-js";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import oauthManager from "../../auth/SessionManager";
import { AuthContextType, LoginCredentials } from "../../types/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("This component needs to be used within an auth context");
  }
  return context;
};

type AuthProviderProps = React.PropsWithChildren<{}>;

export const AuthenticationProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<CognitoUserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(oauthManager.getUserSession());
    setLoading(false);
  }, []);

  const login = (user: LoginCredentials) => {
    if (!user) {
      navigate("/login");
      return;
    }
    oauthManager.login(user, () => {
      setUser(oauthManager.getUserSession());
      navigate(location.state?.from?.pathname || "/");
    });
  };

  const logout = () => {
    console.log("logging out");

    oauthManager.logout(() => {
      navigate("/login");
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, authLoading: loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
