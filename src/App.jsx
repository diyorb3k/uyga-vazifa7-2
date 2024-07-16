import { UserProvider } from "./context/userContext";
// import ComponentA from "./components/ComponentA";
// import ComponentB from "./components/ComponentB";
// import ComponentC from "./components/ComponentC";
import "./App.css";
import Counter from "./components/Counter";
import { CountProvider } from "./context/countContext";
import Posts from "./components/Posts";
import { PostProvider } from "./context/postContext";

const App = () => {
  const name = "John";

  return (
    <UserProvider value={name}>
      <CountProvider>
        <PostProvider>
          <div>
            {/* <ComponentA />
        <ComponentB />
      <ComponentC /> */}

            {/* <Counter /> */}

            <Posts />
          </div>
        </PostProvider>
      </CountProvider>
    </UserProvider>
  );
};

export default App;
