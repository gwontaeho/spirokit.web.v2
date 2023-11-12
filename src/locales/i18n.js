import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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
                    signup: "Sign up",
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
                l: {
                    sbj_reg: "Subject registration",
                    nm: "Name",
                    sex: "Sex",
                    birth: "Date of birth",
                },
                m: {
                    p_0: "Search by chart no.",
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
                    close: "Close",
                    ok: "OK",
                    mea_type: "Measurement type",
                    rst_v: "Result value",
                    tot_gph: "Total grapth",
                    f_diag: "Final diagnosis",
                    mea_time: "Measurement time",
                    ept_v: "Expected value",
                    per: "Percent",
                    n_ran: "Normal range",
                    mea_lev: "Measurement level",
                    diag_rst: "Diagnosis result",
                    err_code: "Error code",
                },
                m: {
                    i_0: "No result found.",
                    i_1: "Please select the graph.",
                    i_2: "Overall score of adequacy and repeatability",
                    i_3: "If each digit satisfies explained condition, each is displayed as 1 or 0.",
                },
            },
            cli: {
                l: {
                    sbn: "Search by name",
                    nm: "Name",
                    role: "Role",
                    reg_dt: "Registration date",
                    aut_man: "Authorization management",
                    aut: "Authorize",
                    den: "Deny",
                },
            },
            dev: {
                l: {
                    list: "Device list",
                    sn: "Serial No.",
                    cnt: "Calibration times",
                    his: "Calibration history",
                    down: "Download calibration result",
                },
            },
            reg_upt: {
                l: {
                    cn: "Chart No.",
                    cli: "Clinician",
                    nm: "Name",
                    sex: "Sex",
                    m: "Male",
                    f: "Female",
                    hgt: "Height",
                    wgt: "Weight",
                    birth: "Date of birth",
                    exp: "Experience",
                    curr: "Currently",
                    y: "Yes",
                    n: "No",
                    smok: "Smoking",
                    n_smok: "Stopping smoking",
                    age_start: "Age of start",
                    age_stop: "Age of stop",
                    ok: "OK",
                    cancel: "Cancel",
                    close: "Close",
                    act_inf: "Account information",
                    role: "Role",
                },
                m: {
                    reg: "Register subject?",
                    upt: "Modify subject information?",
                },
            },
        },
    },
    ko: {
        translation: {
            signin: {
                l: {
                    id: "아이디",
                    pw: "비밀번호",
                    signin: "로그인",
                    signup: "회원가입",
                },
                m: {
                    v_0: "아이디와 비밀번호를 모두 입력한 후 로그인 버튼을 눌러주세요",
                    v_1: "아이디 또는 비밀번호를 확인해 주세요",
                    v_2: "관리자의 승인이 필요한 계정입니다",
                },
            },
            signup: {
                l: {
                    nm: "이름",
                    id: "아이디",
                    pw: "비밀번호",
                    ctr: "국가",
                    org: "기관",
                    role: "직책",
                    signup: "회원가입",
                },
                m: {
                    v_0: "이름을 입력하세요",
                    v_1: "5글자 이상 20글자 이하인 영문과 숫자를 사용한 아이디를 입력하세요",
                    v_2: "이미 사용중인 아이디입니다",
                    v_3: "8글자 이상 20글자 이하인 영문, 숫자, 특수문자를 포함한 비밀번호를 입력하세요",
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
                l: {
                    sbj_reg: "Subject registration",
                    nm: "Name",
                    sex: "Sex",
                    birth: "Date of birth",
                },
                m: {
                    p_0: "Search by chart no.",
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
                    close: "Close",
                    ok: "OK",
                    mea_type: "Measurement type",
                    rst_v: "Result value",
                    tot_gph: "Total grapth",
                    f_diag: "Final diagnosis",
                    mea_time: "Measurement time",
                    ept_v: "Expected value",
                    per: "Percent",
                    n_ran: "Normal range",
                    mea_lev: "Measurement level",
                    diag_rst: "Diagnosis result",
                    err_code: "Error code",
                },
                m: {
                    i_0: "No result found.",
                    i_1: "Please select the graph.",
                    i_2: "Overall score of adequacy and repeatability",
                    i_3: "If each digit satisfies explained condition, each is displayed as 1 or 0.",
                },
            },
            cli: {
                l: {
                    sbn: "Search by name",
                    nm: "Name",
                    role: "Role",
                    reg_dt: "Registration date",
                    aut_man: "Authorization management",
                    aut: "Authorize",
                    den: "Deny",
                },
            },
            dev: {
                l: {
                    list: "Device list",
                    sn: "Serial No.",
                    cnt: "Calibration times",
                    his: "Calibration history",
                    down: "Download calibration result",
                },
            },
            reg_upt: {
                l: {
                    cn: "Chart No.",
                    cli: "Clinician",
                    nm: "Name",
                    sex: "Sex",
                    m: "Male",
                    f: "Female",
                    hgt: "Height",
                    wgt: "Weight",
                    birth: "Date of birth",
                    exp: "Experience",
                    curr: "Currently",
                    y: "Yes",
                    n: "No",
                    smok: "Smoking",
                    n_smok: "Stopping smoking",
                    age_start: "Age of start",
                    age_stop: "Age of stop",
                    ok: "OK",
                    cancel: "Cancel",
                    close: "Close",
                    act_inf: "Account information",
                    role: "Role",
                },
                m: {
                    reg: "Register subject?",
                    upt: "Modify subject information?",
                },
            },
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "ko", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
