type Props = {
  row?: boolean;
};

export default function DivisionLine({ row }: Props) {
  return (
    <>
      <div
        className={`
        ${!row && "border-t h-px w-full"}
        ${row && "border-r w-px h-full"}`}
      />
    </>
  );
}
