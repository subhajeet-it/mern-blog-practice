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
import store, { persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./components/ThemeProvider.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute.jsx";
import CreatePost from "./pages/CreatePost.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/sign-in", element: <Signin /> },
      { path: "/sign-up", element: <SignUp /> },
      {
        element: <PrivateRoute />,
        children: [{ path: "/dashboard", element: <Dashboard /> }],
      },
      {
        element: <OnlyAdminPrivateRoute />,
        children: [{ path: "/create-post", element: <CreatePost /> }],
      },
      { path: "/project", element: <Project /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </StrictMode>
);
