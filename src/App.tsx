import { Route, Routes } from "react-router-dom";
import Login from "./routes/auth/Login";
import Signup from "./routes/auth/Signup";
import Nav from "./components/Nav";
import Dashboard from "./routes/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./routes/Home";
import Datasets from "./routes/Datasets";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        {/* private routes */}

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
          path="/dashboard"
        />
        <Route
          element={
            <PrivateRoute>
              <Datasets />
            </PrivateRoute>
          }
          path="/datasets"
        />

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
        <Route
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
          path="/"
        />
      </Routes>
    </>
  );
}

export default App;
