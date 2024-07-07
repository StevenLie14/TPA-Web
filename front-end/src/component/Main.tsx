import type { Dispatch, ReactNode, SetStateAction } from "react";

import { Header } from "./Header.tsx";

export const Main = ({
  children,
  setSearch,
  search,
}: {
  children: ReactNode;
  setSearch: Dispatch<SetStateAction<string>> | null;
  search?: string;
}) => {
  return (
    <main id={"main"}>
      <Header setSearch={setSearch} search={search} />

      <div className={"content"} id={"content"}>
        {children}
      </div>
    </main>
  );
};
