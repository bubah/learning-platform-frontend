import { CognitoUserSession } from "amazon-cognito-identity-js";
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

type AuthProviderProps = React.PropsWithChildren<{}>;

export const AuthenticationProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(oauthManager.getLoggedInUser());
    setLoading(false);
  }, []);

  const login = (user: LoginCredentials) => {
    if (!user) {
      navigate("/login");
      return;
    }
    oauthManager.login(user, location, (locationString: string) => {
      setUser(oauthManager.getLoggedInUser());
      navigate(locationString);
    });
  };

  const logout = () => {
    oauthManager.logout(() => {
      navigate("/login");
      setUser(null)
    });
  };

  const signUp = (user: LoginCredentials) => {
    if (!user) {
      navigate("/login");
      return;
    }
    oauthManager.signUp(user, () => {
      navigate("/account-verify");
    });
  };

  return (
    <AuthContext.Provider
      value={{ signUp, user, authLoading: loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
