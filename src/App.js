import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Markdown from "./Components/Markdown";
import CreateMarkdown from "./Components/CreateMardown";
import ViewMarkdown from "./Components/ViewMarkdown";
import { EditMarkdown } from "./Components/EditMarkdown";
import Home from "./Components/Home";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import { ProtectedRoute } from "./Auth/ProtectedRoute";
import Dashboard from "./Components/Dashboard";
import ForgotPassword from "./Auth/ForgotPassword";
import PasswordReset from "./Auth/PasswordReset";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/fortgotpassword" element={<ForgotPassword />} />
        <Route
          path="/forgot-password-page/:id/:token"
          element={<PasswordReset />}
        />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="get"
            element={
              <ProtectedRoute>
                <Markdown />
              </ProtectedRoute>
            }
          />

          <Route
            path="create"
            element={
              <ProtectedRoute>
                <CreateMarkdown />
              </ProtectedRoute>
            }
          />

          <Route
            path="view/:id"
            element={
              <ProtectedRoute>
                <ViewMarkdown />
              </ProtectedRoute>
            }
          />

          <Route
            path="edit/:id"
            element={
              <ProtectedRoute>
                <EditMarkdown />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
