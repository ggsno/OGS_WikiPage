import { ReactNode } from "react";
import Header from "../../widgets/header";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
