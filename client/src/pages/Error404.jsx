import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div className="rounded-md m-8 flex justify-center items-center h-40 w-40 border-4 border-t-4 duration-1000 border-blue-500 animate-spin"></div>
      <h1 className="text-4xl text-red-900 font-bold">
        This URL does not exist. Redirecting you to Homepage...
      </h1>
    </div>
  );
}
