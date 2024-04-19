import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from './pages/Layout'
import ErrorPage from "./pages/ErrorPage"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Technology from "./pages/Technology"
import Business from "./pages/Business"
import Environment from "./pages/Environment"
import Politics from "./pages/Politics"
import Entertainment from "./pages/Entertainment"
import Sports from "./pages/Sports"
import SignIn from "./pages/SignIn"


const router=createBrowserRouter([
  {path: "/", element: <Layout/>, errorElement: <ErrorPage/>, children: [
      {index:true, element: <Home/>},
      {path: "technology", element: <Technology/>},
      {path: "business", element: <Business/>},
      {path: "environment", element: <Environment/>},
      {path: "politics", element: <Politics/>},
      {path: "entertainment", element: <Entertainment/>},
      {path: "sports", element: <Sports/>},
      {path: "signin", element: <SignIn/>}

  ]}
])

export default function App(){
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}