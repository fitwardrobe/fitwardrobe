import "../globals.css";

// Legacy page: needs the older global stylesheet (not loaded on the homepage).
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
