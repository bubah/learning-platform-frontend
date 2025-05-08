import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import oauthManager from "../../auth/SessionManager";
import { AuthContextType, LoginCredentials, User } from "../../types/types";
import { httpClient } from "../../client/httpClient";
import { UserDTO } from "../../types/dtos";

// Import vite env vars
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  const [email, setEmail] = useState("");
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
    loadUserEmail(loginCredentials);
    oauthManager.login(loginCredentials, {
      onSuccess: loginSuccess,
      onFailure: () => {
        navigate("/account-verify");
      },
    });
  };

  function loadUserEmail(loginCredentials: LoginCredentials) {
    setEmail(loginCredentials.username);
    localStorage.setItem("email", loginCredentials.username);
  }

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
    loadUserEmail(loginCredentials);
    oauthManager.signUp(loginCredentials, {
      onSuccess: () => {
        navigate("/account-verify");
      },
      onFailure: () => {},
    });
  };

  function loginSuccess() {
    setUser(oauthManager.getLoggedInUser());
    const idToken = oauthManager.getUserSession()?.getIdToken();

    const userDTO: UserDTO = {
      email: idToken?.payload.email,
      username: idToken?.payload.email,
      role: idToken?.payload["cognito:groups"]
        ? idToken?.payload["cognito:groups"][0]?.toUpperCase()
        : "LEARNER",
    };

    httpClient.post("/login", userDTO, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    navigate(location.state?.from?.pathname || "/");
  }

  return (
    <AuthContext.Provider
      value={{ signUp, user, email, authLoading: loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
