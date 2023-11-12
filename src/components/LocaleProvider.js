"use client";

import "@/locales/i18n";
import { useConfig } from "@/recoil";

export const LocaleProvider = ({ children }) => {
    const [config] = useConfig();

    // console.log(config.lang);

    if (!config.lang) return null;

    return <>{children}</>;
};
