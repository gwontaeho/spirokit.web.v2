"use client";

import Link from "next/link";
import { getCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/apis";

export const Header = ({ h1 }) => {
    const accessToken = getCookie("accessToken");

    const { data } = useQuery({ queryKey: ["getMe"], queryFn: () => getMe(accessToken), enabled: !!accessToken });
    const { name } = data?.response || {};

    return (
        <header className="h-20 px-8 flex items-center justify-between bg-white border-b">
            <h1 className="text-xl font-medium">{h1}</h1>
            <div className="flex items-center space-x-2">
                <div className="text-lg">
                    안녕하세요 <span className="font-medium">{name}</span>님
                </div>
                <Link href="/settings" className="material-symbols-outlined text-primary">
                    settings
                </Link>
            </div>
        </header>
    );
};
