import {Header} from "./Header.tsx";
import {Dispatch, ReactNode, SetStateAction} from "react";

export const Main = ({children , setSearch} : {children : ReactNode, setSearch : Dispatch<SetStateAction<string>> | null}) => {

    return(
        <main id={"main"}>
            <Header setSearch={setSearch}/>

            <div className={"content"} id={"content"}>
                {children}
            </div>
        </main>
    )
}