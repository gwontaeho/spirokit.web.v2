"use client";
import Image from "next/image";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter, useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Select, Input, Radio, Loading } from "@/components";
import { getSubject, getClinicians, updateSubject } from "@/apis";
import { RACES } from "@/constants";

const Modal = ({ setOpen, onConfirm }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/30" onClick={() => setOpen(false)}>
            <div className="card w-[400px] p-4 space-y-8" onClick={(e) => e.stopPropagation()}>
                <Image priority src="/logo.svg" alt="logo" width={120} height={20} />
                <div className="text-center">환자를 수정하시겠습니까?</div>
                <div className="flex space-x-4">
                    <button className="input" onClick={() => setOpen(false)}>
                        닫기
                    </button>
                    <button className="input" onClick={onConfirm}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export const Main = () => {
    const { chartNumber } = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const subjectQuery = useQuery({ queryKey: ["subject", chartNumber], queryFn: () => getSubject(chartNumber) });
    const subject = subjectQuery.data?.response || {};
    const values = {
        ...subject,
        birthday: subject.birthday?.replaceAll("-", ""),
        subjectDetails: {
            ...subject.subjectDetails,
            smokingExperience: String(subject.subjectDetails?.smokingExperience),
            smoking: subject.subjectDetails?.smokingExperience === false ? undefined : String(subject.subjectDetails?.smoking),
        },
    };

    const { data } = useQuery({ queryKey: ["clinicians", ""], queryFn: () => getClinicians({ name: "", page: 1, size: 999 }) });
    const clinicians = (data?.response || []).map(({ clinicianName, clinicianId }) => ({ label: clinicianName, value: clinicianId }));
    const races = RACES.map((label, i) => ({ label, value: String(i) }));

    const { mutate, isLoading } = useMutation({
        mutationFn: (variables) => updateSubject({ chartNumber, values: variables }),
        onSuccess: () => router.push(`/subjects/${chartNumber}`),
    });

    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        clearErrors,
        getValues,
        formState: { errors },
    } = useForm({ values });

    const [smokingExperience, smoking] = watch(["subjectDetails.smokingExperience", "subjectDetails.smoking"]);

    const handleConfirm = () => {
        const { chartNumber, name, gender, race, clinicianId, birthday, subjectDetails } = getValues();
        const { height, weight, smoking, smokingExperience, smokingStartAge, smokingStopAge, smokingPackYear } = subjectDetails;
        const variables = {
            chartNumber,
            name,
            gender,
            race,
            clinicianId,
            birthday: dayjs(birthday).format("YYYY-MM-DD"),
            subjectDetails: {
                height,
                weight,
                smoking: smoking === "true" ? true : false,
                smokingExperience: smokingExperience === "true" ? true : false,
                smokingStartAge: smokingStartAge || "",
                smokingStopAge: smokingStopAge || "",
                smokingPackYear: smokingPackYear || "",
            },
        };

        mutate(variables);
    };

    const REGEX_CHARTNUMBER = /^[a-zA-Z0-9]{1,20}$/;
    const REGEX_REALNUMBER = /^[0-9]+(.[0-9]+)?$/;
    const REGEX_INTEGER = /^[0-9]+$/;
    const REGEX_BIRTHDAY = /^[0-9]{8}$/;

    return (
        <>
            <main className="p-8">
                <form className="space-y-8 w-fit" onSubmit={handleSubmit(() => setOpen(true))}>
                    <div className="card p-8 space-y-8">
                        <fieldset className="flex space-x-16 pb-8 border-b">
                            <Input
                                {...register("chartNumber", { required: true, pattern: REGEX_CHARTNUMBER })}
                                label="차트넘버"
                                aria-invalid={!!errors.chartNumber}
                                maxLength={20}
                                disabled
                            />
                            <Controller
                                name="clinicianId"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => {
                                    return (
                                        <Select
                                            {...field}
                                            label="담당자"
                                            disabled={!clinicians.length}
                                            options={clinicians}
                                            aria-invalid={!!errors.clinicianId}
                                        />
                                    );
                                }}
                            />
                        </fieldset>
                        <div className="flex space-x-16">
                            <fieldset className="space-y-8">
                                <Input {...register("name", { required: true })} label="이름" aria-invalid={!!errors.name} />
                                <Radio
                                    {...register("gender", { required: true })}
                                    label="성별"
                                    options={[
                                        { key: "남", value: "m" },
                                        { key: "여", value: "f" },
                                    ]}
                                    aria-invalid={!!errors.gender}
                                />
                                <Input
                                    {...register("subjectDetails.height", { required: true, pattern: REGEX_REALNUMBER })}
                                    label="신장"
                                    maxLength={6}
                                    aria-invalid={!!errors.subjectDetails?.height}
                                    unit="cm"
                                />

                                <Input
                                    {...register("subjectDetails.weight", { required: true, pattern: REGEX_REALNUMBER })}
                                    label="체중"
                                    maxLength={6}
                                    aria-invalid={!!errors.subjectDetails?.weight}
                                    unit="kg"
                                />
                                <Input
                                    {...register("birthday", { required: true, pattern: REGEX_BIRTHDAY })}
                                    label="생년월일"
                                    placeholder="YYYYMMDD"
                                    maxLength={8}
                                    disabled
                                />
                                {/* <Controller
                                    name="race"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => {
                                        return <Select {...field} label="인종" options={races} aria-invalid={!!errors.race} />;
                                    }}
                                /> */}
                            </fieldset>
                            <fieldset className="space-y-8">
                                <Radio
                                    {...register("subjectDetails.smokingExperience", {
                                        required: true,
                                        onChange: ({ target: { value } }) => {
                                            if (value === "false") {
                                                setValue("subjectDetails.smoking", false);
                                                setValue("subjectDetails.smokingStartAge", "");
                                                setValue("subjectDetails.smokingPackYear", "");
                                                setValue("subjectDetails.smokingStopAge", "");
                                                clearErrors([
                                                    "subjectDetails.smoking",
                                                    "subjectDetails.smokingStartAge",
                                                    "subjectDetails.smokingPackYear",
                                                    "subjectDetails.smokingStopAge",
                                                ]);
                                            }
                                        },
                                    })}
                                    label="흡연경험"
                                    options={[
                                        { key: "있음", value: true },
                                        { key: "없음", value: false },
                                    ]}
                                    aria-invalid={!!errors.subjectDetails?.smokingExperience}
                                />
                                <Radio
                                    {...register("subjectDetails.smoking", {
                                        required: smokingExperience === "true",
                                        onChange: ({ target: { value } }) => {
                                            if (value === "true") {
                                                setValue("subjectDetails.smokingStopAge", "");
                                                clearErrors("subjectDetails.smokingStopAge");
                                            }
                                        },
                                    })}
                                    label="현재 흡연여부"
                                    options={[
                                        { key: "흡연", value: true },
                                        { key: "금연", value: false },
                                    ]}
                                    aria-invalid={!!errors.subjectDetails?.smoking}
                                    disabled={smokingExperience !== "true"}
                                />
                                <Input
                                    {...register("subjectDetails.smokingStartAge", { required: smokingExperience === "true", pattern: REGEX_INTEGER })}
                                    label="흡연을 시작한 나이"
                                    aria-invalid={!!errors.subjectDetails?.smokingStartAge}
                                    maxLength={3}
                                    disabled={smokingExperience !== "true"}
                                />
                                <Input
                                    {...register("subjectDetails.smokingPackYear", { required: smokingExperience === "true", pattern: REGEX_INTEGER })}
                                    label="연간 흡연량"
                                    aria-invalid={!!errors.subjectDetails?.smokingPackYear}
                                    maxLength={3}
                                    disabled={smokingExperience !== "true"}
                                />
                                <Input
                                    {...register("subjectDetails.smokingStopAge", {
                                        required: smoking === "false",
                                        pattern: REGEX_INTEGER,
                                    })}
                                    label="금연한 나이"
                                    aria-invalid={!!errors.subjectDetails?.smokingStopAge}
                                    maxLength={3}
                                    disabled={smokingExperience !== "true" || smoking !== "false"}
                                />
                            </fieldset>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <button className="input flex-1" type="button" onClick={() => router.back()}>
                            취소
                        </button>
                        <button className="input flex-1">수정</button>
                    </div>
                </form>
            </main>

            {open && createPortal(<Modal setOpen={setOpen} onConfirm={handleConfirm} />, document.body)}
            {isLoading && <Loading />}
        </>
    );
};
