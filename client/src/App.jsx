import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import categories from "./utils/categories";
import CategoriesPage from "./pages/CategoriesPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Auth from "./pages/Auth";
import Error404 from "./pages/Error404";
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
        path: "user",
        element: <Auth />,
        children: [{ path: ":username", element: <h1>This is protected</h1> }],
      },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
