import { useRouter } from "next/router";
import { XRPLProvider } from "@/contexts/XRPLContext";
import Login from "./login";
import Home from "./index";
import "@/styles/globals.css";

export default function App() {
  const router = useRouter();

  return (
    <XRPLProvider>
      {router.pathname === '/' && <Home />}
      {router.pathname === '/login' && <Login />}
    </XRPLProvider>
  );
}
