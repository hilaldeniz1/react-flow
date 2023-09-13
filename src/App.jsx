import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Register from "./pages/Register";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
