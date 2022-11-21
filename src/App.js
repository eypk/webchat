import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./styles.scss";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  //creates protected route for authenticates user, otherwise redirects to login page
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* <Route index element={currentUser ? <Home /> : <Login />} /> */}
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path={"register"} element={<Register />} />
            <Route path={"login"} element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Login /> */}
      {/* <Home /> */}
    </div>
  );
}

export default App;
