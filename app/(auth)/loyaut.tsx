import "../globals.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="w-full min-h-scren ">
      <div className="max-w-[95%]">
        <div className="max-w-[60%] bg-p-100">
          <div className="w-full bg-p-400 flex z-10"></div>
        </div>
        <div className="max-w-[30%] bg-g-100">{children}</div>
      </div>
    </div>
  );
}
