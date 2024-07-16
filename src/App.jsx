import { UserProvider } from "./context/userContext";
import { CountProvider } from "./context/countContext";
import Posts from "./components/Posts";
import { PostProvider } from "./context/postContext";
import "./components/Post.css"

const App = () => {
  const name = "John";

  return (
    <UserProvider value={name}>
      <CountProvider>
        <PostProvider>
          <div>
            

            <Posts />
          </div>
        </PostProvider>
      </CountProvider>
    </UserProvider>
  );
};

export default App;
