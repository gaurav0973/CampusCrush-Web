import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import Feed from "./pages/Feed.jsx";
import Profile from "./pages/Profile.jsx";
import Connections from "./pages/Connections.jsx";
import Requests from "./pages/Requests.jsx";
import Chat from "./pages/Chat.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
