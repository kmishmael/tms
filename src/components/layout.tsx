import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="wrapp flex w-full">
        <Sidebar />
        <div id="content">{children}</div>
      </div>
    </>
  );
}
