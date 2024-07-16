import { UserConsumer } from "../context/userContext";

const ComponentA = () => {
  return (
    <div>
      <UserConsumer>{(name) => <h1>Component A by {name}</h1>}</UserConsumer>
    </div>
  );
};

export default ComponentA;
