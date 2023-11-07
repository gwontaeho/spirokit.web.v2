"use client";
import Link from "next/link";

export const Clinician = ({ data }) => {
    const { clinicianName, clinicianRoleName } = data;

    return (
        <section className="card w-80">
            <div className="p-4 font-medium">의료진정보</div>
            <div className="p-4 flex flex-col text-sm space-y-4 [&>div]:flex [&>div>span]:w-24 [&>div>span]:text-gray-400">
                <div>
                    <span>이름</span>
                    <p>{clinicianName}</p>
                </div>
                <div>
                    <span>직책</span>
                    <p>{clinicianRoleName}</p>
                </div>
            </div>
        </section>
    );
};
