import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="wrapp flex w-4/5 mx-auto">
        {/* <Sidebar /> */}
        <div id="content">{children}</div>
      </div>
    </>
  );
}
