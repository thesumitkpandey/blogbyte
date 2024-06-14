import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import categories from "./utils/categories";
import CategoriesPage from "./pages/CategoriesPage";
import Signin from "./pages/Signin";
import { signIn, signOut } from "./redux/user/userSlice";
import Signup from "./pages/Signup";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Auth from "./pages/Auth";
import axios from "axios";
import Error404 from "./pages/Error404";
import Cookies from "js-cookie";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "*", element: <Error404 /> },
      { index: true, element: <HomePage /> },
      ...categories.map((item) => ({
        path: `/${item}`,
        element: <CategoriesPage />,
      })),
      { path: "/signin", element: <Signin /> },
      { path: "/signup", element: <Signup /> },
      //Protected routes
      {
        element: <Auth />,
        children: [{ path: "u/:username", element: <Profile /> }],
      },
    ],
  },
]);
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function verifyToken() {
      let response = await axios.post("/api/v1/users/verifytoken");
      if (response.status === 200) {
        dispatch(signIn(response.data.user));
      }
    }
    verifyToken();
  }, []);
  return <RouterProvider router={router} />;
}
