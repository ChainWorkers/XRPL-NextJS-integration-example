import { useRouter } from "next/router";
import Home from ".";
import "@/styles/globals.css";
import { XRPLProvider } from "@/contexts/XRPLContext";

export default function App() {
  const router = useRouter();

  return (
    <XRPLProvider>
      {router.pathname === '/' && <Home />}
    </XRPLProvider>
  );
}
