import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";

import Login from "./Pages/authentication/Login";
import Register from "./Pages/authentication/register";
import VerifyCode from "./Pages/authentication/VerifyCode";

import Home from "./Pages/Home/home";
import Books from "./Pages/Books/Books-home";
import Authors from "./Pages/Authors/Authors-home";
import AddBook from "./Pages/Books/Add-book";
import AddAuthor from "./Pages/Authors/Add-author";
import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-code" element={<VerifyCode />} />

          {/* Main */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="books" element={<Books />} />
            <Route path="authors" element={<Authors />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="add-author" element={<AddAuthor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
