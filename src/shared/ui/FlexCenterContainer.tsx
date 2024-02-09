import { ReactNode } from "react";

export default function FlexCenterContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="px-4 w-full md:w-[700px]">{children}</div>
      </div>
    </>
  );
}
