import { useAuth } from "../../hooks/AuthenticationProvider";
import InstructorsRoute from "./InstructorsRoute";

const RouteWrapper = () => {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase();

  if (user === null) {
    return null;
  }

  return <>{role === "instructor" ? <InstructorsRoute /> : null}</>;
};
export default RouteWrapper;
