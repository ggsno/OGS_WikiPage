import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Card({ children }: Props) {
  return (
    <div className="flex items-center w-full h-10 hover:bg-slate-50">
      {children}
    </div>
  );
}

function Text({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

Card.Text = Text;
