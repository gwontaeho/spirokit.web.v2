import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            signin: {
                l: {
                    id: "ID",
                    pw: "Password",
                    signin: "Sign in",
                    signup: "Sign up",
                },
                m: {
                    v_0: "Click sign in button after entering your ID and password.",
                    v_1: "Check your ID and password.",
                    v_2: "Administrator's authorization is required.",
                },
            },
            signup: {
                l: {
                    nm: "Name",
                    id: "ID",
                    pw: "Password",
                    ctr: "Country",
                    org: "Organization",
                    role: "Role",
                    signun: "Sign up",
                },
                m: {
                    v_0: "Enter your name.",
                    v_1: "ID should contain 5~20 english letters or numbers.",
                    v_2: "This ID is already used.",
                    v_3: "Password should contain 8~20 English letters, numbers, or special characters.",
                },
            },
            layout: {
                l: {
                    sch_sbj: "Search Subject",
                    cli_mng: "Clinician management",
                    dvi_mng: "Device management",
                    rct_sch: "Recent search",
                    rst: "Result",
                },
            },
            subjects: {
                m: {
                    p_0: "Search by chart no.",
                },
                l: {
                    sbj_reg: "Subject registration",
                    nm: "Name",
                    sex: "Sex",
                    birth: "Date of birth",
                },
            },
            subject: {
                l: {
                    sbj_inf: "Subject information",
                    cn: "Chart No.",
                    nm: "Name",
                    birth: "Date of birth",
                    sex: "Sex",
                    wgt: "Weight",
                    hgt: "Height",
                    exp: "Experience",
                    cur: "Currently",
                    p_year: "Pack-year",
                    period: "Smoking Period",
                    cli_inf: "Clinician information",
                    role: "Role",
                    mea_his: "Measurement history",
                    all: "All",
                    start: "Start date",
                    end: "End date",
                },
            },
        },
    },
    fr: {
        translation: {
            "Welcome to React": "Bienvenue à React et react-i18next",
        },
    },
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
