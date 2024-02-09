import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function Header({
  MenuComponent,
}: {
  MenuComponent?: ReactNode;
}) {
  return (
    <>
      <header className="flex justify-between py-4">
        <Link to="/" className="text-lg font-bold leading-10">
          코딩허브 위키
        </Link>
        {MenuComponent}
      </header>
    </>
  );
}
