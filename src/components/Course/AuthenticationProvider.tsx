import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContextType, LoginCredentials } from "../../types/types";

const credentials = [
  {
    username: "hrazak",
    password: "123",
    role: "student",
  },
  {
    username: "bubahc",
    password: "123",
    role: "teacher",
  },
];

function getLoginStatus(): LoginCredentials | null {
  const userCreds: LoginCredentials | null = JSON.parse(
    localStorage.getItem("authenticatedUser") || "{}",
  );
  return (
    credentials.find(
      (crendential) =>
        crendential.username === userCreds?.username &&
        crendential.password === userCreds?.password,
    ) || null
  );
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authLoading: false,
  login: (user: LoginCredentials) => {
    console.log(user);
  },
  logout: () => {},
});

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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = getLoginStatus();
    setUser(user);
    setLoading(false);
  }, []);

  const login = (user: LoginCredentials) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setUser(user);
    localStorage.setItem("authenticatedUser", JSON.stringify(user));
    const redirectUrl = location.state?.from?.pathname || "/";
    navigate(redirectUrl);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authenticatedUser");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, authLoading: loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
