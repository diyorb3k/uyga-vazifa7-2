import { useContext } from "react";
import { UserContext } from "../context/userContext";
import ComponentD from "./ComponentD";

const ComponentB = () => {
  const name = useContext(UserContext);
  return (
    <div>
      <h1>Component B by {name}</h1>
      <ComponentD />
    </div>
  );
};

export default ComponentB;
