import { Route, Routes } from "react-router-dom";
import Login from "./routes/auth/Login";
import Signup from "./routes/auth/Signup";
import Nav from "./components/Nav";
import Home from "./routes/Home";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        {/* public routes */}
        <Route
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
          path="/login"
        />
        <Route
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
          path="/signup"
        />
        {/* private routes */}

        <Route
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
          path="/"
        />
      </Routes>
    </>
  );
}

export default App;
