import { createContext, useContext, useEffect, useState } from "react";
import { pagesMap } from "../__mock_data__/navigation/navigation-items";
import { useAuth } from "./AuthenticationProvider";

interface NavContextType {
  // Define any state or functions you want to provide here
  navItems: string[];
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error(
      "useNavigationContext must be used within a NavigationProvider",
    );
  }
  return context;
};

export function NavigationProvider({ children }: React.PropsWithChildren) {
  const { user } = useAuth();
  const [navItems, setNavItems] = useState<string[]>([]);

  useEffect(() => {
    const userRole = user?.role?.toLowerCase() as keyof typeof pagesMap;
    if (userRole && pagesMap[userRole]) {
      setNavItems(pagesMap[userRole]);
    } else {
      setNavItems(pagesMap["default"]);
    }
  }, [user]);

  return (
    <NavContext.Provider value={{ navItems }}>{children}</NavContext.Provider>
  );
}
