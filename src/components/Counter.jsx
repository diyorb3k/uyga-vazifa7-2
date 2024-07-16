import { useContext } from "react";
import { CountContext } from "../context/countContext";

const Counter = () => {
  const { count, dispatch } = useContext(CountContext);
  return (
    <div>
      <h2>Count one - {count.first}</h2>
      <div>
        <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
          Increment 5
        </button>
        <button onClick={() => dispatch({ type: "increment", payload: 1 })}>
          Increment
        </button>
        <button onClick={() => dispatch({ type: "decrement", payload: 1 })}>
          Decrement
        </button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
      <h2>Count two - {count.second}</h2>
      <div>
        <button onClick={() => dispatch({ type: "incrementTwo", payload: 1 })}>
          Increment count two
        </button>
        <button onClick={() => dispatch({ type: "decrementTwo", payload: 1 })}>
          Decrement count two
        </button>
      </div>
    </div>
  );
};

export default Counter;
