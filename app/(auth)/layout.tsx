import "../globals.css";
import { AuthSplit } from "./_components/auth-split";

interface LayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
  return <AuthSplit>{children}</AuthSplit>;
}
