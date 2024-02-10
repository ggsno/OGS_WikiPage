import { ReactNode, createContext, useContext } from "react";

const ListContext = createContext(0);

/** 컴파운드 컴포넌트: ItemText, Container, TotalCount, Pagination */
export default function List(props: {
  children: ReactNode;
  itemHeight: number;
}) {
  const { children, itemHeight } = props;

  return (
    <>
      <ListContext.Provider value={itemHeight}>{children}</ListContext.Provider>
    </>
  );
}

function ItemText(
  props: {
    text: string;
  } & React.HTMLAttributes<HTMLDivElement>
) {
  const { text, ...rest } = props;
  const itemHeight = useContext(ListContext);

  return (
    <div
      style={{ height: `calc(${itemHeight} * 0.25rem)` }}
      className={`flex items-center w-full px-2
      hover:bg-slate-50 hover:cursor-pointer`}
      {...rest}
    >
      {text}
    </div>
  );
}

function Container(props: { children: ReactNode; rowCount: number }) {
  const { children, rowCount } = props;
  const itemHeight = useContext(ListContext);

  return (
    <div style={{ height: `calc(${itemHeight * rowCount} * 0.25rem)` }}>
      {children}
    </div>
  );
}

function TotalCount(
  props: {
    totalCount: number;
  } & React.HTMLAttributes<HTMLDivElement>
) {
  const { totalCount, ...rest } = props;

  return (
    <div className="text-sm px-2" {...rest}>
      총 <span className="font-bold">{totalCount.toLocaleString()}개</span>의
      자료가 있어요!
    </div>
  );
}

List.ItemText = ItemText;
List.Container = Container;
List.TotalCount = TotalCount;
