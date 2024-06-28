import {Card} from "./Card.tsx";
import {Header} from "./Header.tsx";

export const Main = () => {

    return(
        <main>
            <Header/>
            <div className={"content"}>
                <h1>Uniquely Yours</h1>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </main>
    )
}