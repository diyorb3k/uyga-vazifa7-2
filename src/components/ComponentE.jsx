import { useContext } from "react";
import ComponentF from "./ComponentF";
import { UserContext } from "../context/userContext";

const ComponentE = () => {
  const name = useContext(UserContext);
  return (
    <div>
      <h2>Component E by {name}</h2>
      <ComponentF />
    </div>
  );
};

export default ComponentE;
