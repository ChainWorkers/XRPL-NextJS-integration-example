import { useRouter } from "next/router";
import Home from ".";
import "@/styles/globals.css";

export default function App() {
  const router = useRouter();

  return (
    <>
      {router.pathname === '/' && <Home />}
    </>
  );
}
