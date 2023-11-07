"use client";
import Link from "next/link";

export const Subject = ({ data }) => {
    const { chartNumber, name, birthday, gender, subjectDetails = {} } = data;
    const { weight, height, smoking, smokingExperience, smokingPackYear, smokingStartAge, smokingStopAge } = subjectDetails;
    const period = smokingExperience
        ? !!smokingStopAge
            ? `${Number(smokingStopAge) - Number(smokingStartAge)}년`
            : `${new Date().getFullYear() - Number(birthday.slice(0, 4)) + 1 - Number(smokingStartAge)}년`
        : "-";

    const GENDERS = { m: "남", f: "여" };

    return (
        <section className="card w-80">
            <div className="p-4 font-medium">환자정보</div>
            <div className="p-4 flex flex-col text-sm space-y-4 [&>div]:flex [&>div>span]:w-24 [&>div>span]:text-gray-400">
                <div>
                    <span>차트넘버</span>
                    <p>{chartNumber}</p>
                </div>
                <div>
                    <span>이름</span>
                    <p>{name}</p>
                </div>
                <div>
                    <span>생년월일</span>
                    <p>{birthday}</p>
                </div>
                <div>
                    <span>성별</span>
                    <p>{GENDERS[gender]}</p>
                </div>
                <div>
                    <span>몸무게</span>
                    <p>{weight} kg</p>
                </div>
                <div>
                    <span>키</span>
                    <p>{height} cm</p>
                </div>
                <div>
                    <span>흡연경험</span>
                    <p>{smokingExperience ? "있음" : "없음"}</p>
                </div>
                <div>
                    <span>흡연여부</span>
                    <p>{smokingExperience ? (smoking ? "흡연" : "금연") : "-"}</p>
                </div>
                <div>
                    <span>연간흡연량</span>
                    <p>{!!smokingPackYear ? `${smokingPackYear}갑` : "-"}</p>
                </div>
                <div>
                    <span>흡연기간</span>
                    <p>{period}</p>
                </div>
                <Link href={`/subjects/${chartNumber}/update`}>
                    <button className="input h-8 w-full">정보수정</button>
                </Link>
            </div>
        </section>
    );
};
