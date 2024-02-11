import { ReactNode } from "react";

export default function FullScreenContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="px-4 w-full md:w-[700px]">
          <div
            className="flex flex-col gap-4 justify-center items-center
            w-full h-screen"
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
