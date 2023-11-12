"use client";

import "@/locales/i18n";
import { useConfig } from "@/recoil";

export const LocaleProvider = ({ children }) => {
    const [config] = useConfig();

    if (!config.lang) return <body />;

    return <>{children}</>;
};
