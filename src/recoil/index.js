"use client";
import { useState, useEffect } from "react";
import { RecoilRoot, atom, useRecoilState, useResetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const defaultValue = {
    user: {},
    subject: {
        // chartNumber
        // date
        // pre_g
        // post_g
        // pre_r
        // post_r
        // tab
        // type
    },
};

const userState = atom({
    key: "userState",
    default: defaultValue.user,
    effects_UNSTABLE: [persistAtom],
});

const subjectState = atom({
    key: "subjectState",
    default: defaultValue.subject,
    effects_UNSTABLE: [persistAtom],
});

export const useUser = () => {
    const [isInitial, setIsInitial] = useState(true);
    const [user, setUser] = useRecoilState(userState);
    const resetUser = useResetRecoilState(userState);

    useEffect(() => {
        setIsInitial(false);
    }, []);

    return [isInitial ? defaultValue.user : user, setUser, resetUser];
};

export const useSubject = () => {
    const [isInitial, setIsInitial] = useState(true);
    const [subject, setSubject] = useRecoilState(subjectState);
    const resetSubject = useResetRecoilState(subjectState);

    useEffect(() => {
        setIsInitial(false);
    }, []);

    return [isInitial ? defaultValue.subject : subject, setSubject, resetSubject];
};

export const Recoil = ({ children }) => {
    return <RecoilRoot>{children}</RecoilRoot>;
};
