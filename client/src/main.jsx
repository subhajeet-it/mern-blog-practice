import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Signin from "./pages/Signin.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Project from "./pages/Project.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/sign-in", element: <Signin /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/project", element: <Project /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <Provider store={store}>
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
      </Provider>
  </StrictMode>
);
