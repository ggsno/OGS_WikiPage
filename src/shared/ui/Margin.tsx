type Props = {
  size: number;
  row?: boolean;
};

export default function Margin({ size, row }: Props) {
  return (
    <>
      {!row && <div style={{ height: `calc(${size} * 0.25rem)` }} />}
      {row && <div style={{ width: `calc(${size} * 0.25rem)` }} />}
    </>
  );
}
