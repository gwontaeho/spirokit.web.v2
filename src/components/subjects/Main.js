"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Loading } from "@/components";
import { getSubjects } from "@/apis";

export const Main = () => {
    const { t } = useTranslation();

    const observerRef = useRef(null);

    const perPage = 40;
    const [chartNumber, setChartNumber] = useState("");
    const [page, setPage] = useState(1);

    const { register, handleSubmit } = useForm();

    const { data, isLoading } = useQuery({
        queryKey: ["subjects", chartNumber],
        queryFn: () => getSubjects({ chartNumber, page: 1, size: 999 }),
    });

    const subjects = data?.response || [];
    const chunked = [];
    for (let i = 0; i < subjects.length; i += perPage) {
        const sliced = subjects.slice(i, i + perPage);
        chunked.push(sliced);
    }
    const s = chunked.slice(0, page).flat();

    useEffect(() => {
        if (!observerRef.current) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setPage((prev) => prev + 1);
            });
        });
        observer.observe(observerRef.current);
    }, [observerRef]);

    const onSubmit = ({ chartNumber }) => {
        setChartNumber(chartNumber);
        setPage(1);
    };

    return (
        <>
            <main className="flex flex-col p-8 space-y-4">
                <div className="flex justify-between">
                    <form className="flex space-x-4" onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("chartNumber")} className="input w-48 lg:w-96" placeholder="차트넘버로 검색" />
                        <button className="material-symbols-outlined input w-fit">search</button>
                    </form>
                    <Link href="/subjects/regist">
                        <button className="input w-fit lg:w-96">환자등록</button>
                    </Link>
                </div>
                <div className="flex-1 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {s.map((v, i) => {
                        const { birthday, chartNumber, gender, name } = v;
                        const GENDERS = { m: "남", f: "여" };
                        return (
                            <Link key={`subject-${chartNumber}`} href={`subjects/${chartNumber}`}>
                                <div className="card cursor-pointer h-40 p-4 flex flex-col justify-between [&>div]:flex [&>div]:items-center [&>div>span]:w-24 [&>div>span]:text-gray-400 [&>div>span]:text-sm hover:bg-gray-100">
                                    <div>
                                        <span>이름</span>
                                        <p className="text-primary">{name}</p>
                                    </div>
                                    <div>
                                        <span>차트넘버</span>
                                        <p>{chartNumber}</p>
                                    </div>
                                    <div>
                                        <span>성별</span>
                                        <p>{GENDERS[gender]}</p>
                                    </div>
                                    <div>
                                        <span>생년월일</span>
                                        <p>{birthday}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div ref={observerRef} hidden={isLoading || page >= chunked.length} />
            </main>
            {isLoading && <Loading />}
        </>
    );
};