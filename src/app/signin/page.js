"use client";
import Image from "next/image";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { useUser } from "@/recoil";
import { signin, getMe } from "@/apis";
import { Loading } from "@/components";
import { useEffect } from "react";

export default function Signin() {
    const router = useRouter();
    const [_, setUser] = useUser();

    const signinMutation = useMutation({
        mutationFn: (variables) => signin(variables),
    });

    const getMeMutation = useMutation({
        mutationFn: (variables) => getMe(variables),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { loginId, password } = data;
        try {
            const {
                response: { accessToken, refreshToken },
            } = await signinMutation.mutateAsync({ loginId, password });
            const {
                response: { id, name, clinicianRoleName },
            } = await getMeMutation.mutateAsync(accessToken);
            setCookie("accessToken", accessToken);
            setCookie("refreshToken", refreshToken);
            setUser({ id, name, clinicianRoleName });
            router.replace("/subjects");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const accessToken = getCookie("accessToken");
        if (!accessToken) return;
        router.replace("/");
    }, []);

    const formError = !!errors.loginId || !!errors.password;
    const isError = formError || signinMutation.isError || getMeMutation.isError;
    const isLoading = signinMutation.isLoading || getMeMutation.isLoading;
    const isSuccess = signinMutation.isSuccess && getMeMutation.isSuccess;
    const status = formError ? 401 : signinMutation.error?.response?.status;
    const errorMessage = {
        400: "아이디 또는 비밀번호를 확인해 주세요",
        401: "아이디와 비밀번호를 모두 입력한 후 로그인 버튼을 눌러주세요",
        403: "관리자의 승인이 필요한 계정입니다",
    };

    return (
        <>
            <main className="flex h-screen justify-center items-center">
                <div className="card flex flex-col">
                    <div className="flex items-center justify-center h-60">
                        <Image priority src="/logo.svg" alt="logo" width={240} height={30} />
                    </div>
                    <form className="px-8 pb-8 flex flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="text-gray-600 w-20">아이디</div>
                                <input className="input" {...register("loginId", { required: true })} />
                            </div>
                            <div className="flex items-center">
                                <div className="text-gray-600 w-20">비밀번호</div>
                                <input className="input" autoComplete="off" type="password" {...register("password", { required: true })} />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <button className="input w-full">로그인</button>
                            <Link href="/signup">
                                <button className="input w-full">회원가입</button>
                            </Link>
                        </div>
                        {isError && <div className="text-red-600 text-sm text-center">{errorMessage[status]}</div>}
                    </form>
                </div>
            </main>
            {(isLoading || isSuccess) && <Loading />}
        </>
    );
}
