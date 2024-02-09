type Props = {
  variant?: "main" | "sub";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ variant = "main", ...rest }: Props) {
  return (
    <>
      <button
        className={`h-10 px-4 rounded-lg text-white hover:duration-100
          ${variant === "main" && "bg-[#3080ff] hover:bg-[#2666cc]"}
          ${variant === "sub" && "bg-[#1e293b] hover:bg-[#0f172a]"}
        `}
        {...rest}
      />
    </>
  );
}
