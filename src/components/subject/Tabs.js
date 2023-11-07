"use client";
import { useSubject } from "@/recoil";

export const Tabs = ({ svc }) => {
    const [subject, setSubject] = useSubject();
    const { tab = 0 } = subject;

    const TABS = svc ? ["결과값", "전체 그래프"] : ["결과값", "전체 그래프", "최종 진단"];

    return (
        <div className="flex w-fit border-b h-12 text-lg [&>div]:flex [&>div]:w-36 [&>div]:justify-center [&>div]:items-center">
            {TABS.map((v, i) => (
                <div
                    aria-selected={tab === i}
                    key={`tab-${v}`}
                    className="border-b cursor-pointer aria-selected:border-primary aria-selected:text-primary hover:text-primary"
                    onClick={() => setSubject((prev) => ({ ...prev, tab: i }))}
                >
                    {v}
                </div>
            ))}
        </div>
    );
};
