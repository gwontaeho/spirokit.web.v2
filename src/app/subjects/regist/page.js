import { Header, Nav } from "@/components";
import { Main } from "@/components/subjects/regist/Main";

export default function Regist() {
    return (
        <>
            <Nav />
            <div className="ml-40">
                <Header h1="환자등록" />
                <Main />
            </div>
        </>
    );
}
