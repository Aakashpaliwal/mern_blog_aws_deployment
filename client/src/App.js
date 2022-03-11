import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Login from "./components/LoginAndRegister/Login";
import Register from "./components/LoginAndRegister/Register";
import AddPost from "./components/Posts/AddPost";
import ViewPost from "./components/Posts/ViewPost";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" exact element={<AddPost />} />
        <Route path="/viewPosts" exact element={<ViewPost />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
