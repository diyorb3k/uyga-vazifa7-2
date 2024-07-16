import { useState } from "react";
import { UserConsumer } from "../context/userContext";

const ComponentF = () => {
  return (
    <div>
      <UserConsumer>
        {(name) => {
          return <h3>Component F by {name}</h3>;
        }}
      </UserConsumer>
    </div>
  );
};

export default ComponentF;
