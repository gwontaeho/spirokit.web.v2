"use client";
import Link from "next/link";
import Image from "next/image";
import { useSubject } from "@/recoil";

export const Nav = ({ current }) => {
    const [subject] = useSubject();
    const { chartNumber } = subject;

    const PAGES = [
        { label: "환자검색", page: "subjects" },
        { label: "의료진관리", page: "clinicians" },
        { label: "디바이스관리", page: "devices" },
    ];

    return (
        <nav className="w-40 flex flex-col fixed h-full rounded-r-3xl shadow bg-white">
            <div className="h-20 flex px-4 mb-20">
                <div className="relative flex-1">
                    <Image priority src="/logo.svg" alt="logo" fill />
                </div>
            </div>
            <ul className="flex flex-col px-2">
                {PAGES.map(({ label, page }) => {
                    return (
                        <li key={`nav-${page}`}>
                            <Link
                                href={`/${page}`}
                                aria-current={current === page && "page"}
                                className="block py-4 text-center border-l-2 border-white hover:text-primary aria-[current=page]:bg-slate-100 aria-[current=page]:border-primary aria-[current=page]:text-primary"
                            >
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <div className="mt-auto px-2 py-4">
                <div className="text-center text-gray-400">최근검색</div>
                <ul className="lex flex-col">
                    <li>
                        <Link
                            aria-current={current === "subject" && "page"}
                            className="block py-4 rounded-lg text-center hover:text-primary aria-[current=page]:text-primary"
                            href={`/subjects/${chartNumber}`}
                        >
                            {chartNumber || "-"}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
