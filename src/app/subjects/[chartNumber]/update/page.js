import { Header, Nav } from "@/components";
import { Main } from "@/components/subjects/update/Main";

export default function Update() {
    return (
        <>
            <Nav />
            <div className="ml-40">
                <Header h1="환자수정" />
                <Main />
            </div>
        </>
    );
}
