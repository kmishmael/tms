import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/navbar";
import { Toaster } from "@/components/ui/toaster"
import Chattbot from "../components/chatbot";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <Navbar />
          {/* <Sidebar /> */}
          <div className="w-4/5 mx-auto p-2">{children}</div>
          <Toaster />
          <Chattbot />
    </>
  );
}
