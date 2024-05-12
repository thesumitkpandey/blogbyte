import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import categories from "./utils/categories";
import CategoriesPage from "./pages/CategoriesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>Not found</h1>,
    children: [
      { index: true, element: <HomePage /> },
      ...categories.map((item) => ({
        path: `/${item}`,
        element: <CategoriesPage />,
      })),
      { path: "/new", element: <h1>New</h1> },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
