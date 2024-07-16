import CenterIcon from "../components/ui/CenterIcon";
import modal from "./modalServices";

import { baseURL } from "../config";
import { isBunny, isKillerPlayer } from "./defaultSettings";

export const Icons = {
    video: <CenterIcon className={`text-yellow-500`} icon={"ant-design:video-camera-twotone"} />,
    exam: <CenterIcon className="text-rose-500" nY="px" icon={"ph:exam-duotone"} />,
    book: <CenterIcon className="text-blue-400" nY="px" icon={"icon-park-twotone:book-one"} />,
    hm: <CenterIcon className="text-teal-400" nY="px" icon={"ic:twotone-quiz"} />,
};

export const tailwindColors = [
    {
        value: "slate",
        label: "Slate",
        color: "#64748b",
    },
    {
        value: "gray",
        label: "Gray",
        color: "#6b7280",
    },
    {
        value: "zinc",
        label: "Zinc",
        color: "#71717a",
    },
    {
        value: "neutral",
        label: "Neutral",
        color: "#737373",
    },
    {
        value: "stone",
        label: "Stone",
        color: "#78716c",
    },
    {
        value: "red",
        label: "Red",
        color: "#ef4444",
    },
    {
        value: "orange",
        label: "Orange",
        color: "#f97316",
    },
    {
        value: "amber",
        label: "Amber",
        color: "#f59e0b",
    },
    {
        value: "yellow",
        label: "Yellow",
        color: "#eab308",
    },
    {
        value: "lime",
        label: "Lime",
        color: "#84cc16",
    },
    {
        value: "green",
        label: "Green",
        color: "#22c55e",
    },
    {
        value: "emerald",
        label: "Emerald",
        color: "#10b981",
    },
    {
        value: "teal",
        label: "Teal",
        color: "#14b8a6",
    },
    {
        value: "cyan",
        label: "Cyan",
        color: "#06b6d4",
    },
    {
        value: "sky",
        label: "Sky",
        color: "#0ea5e9",
    },
    {
        value: "blue",
        label: "Blue",
        color: "#3b82f6",
    },
    {
        value: "indigo",
        label: "Indigo",
        color: "#6366f1",
    },
    {
        value: "violet",
        label: "Violet",
        color: "#8b5cf6",
    },
    {
        value: "purple",
        label: "Purple",
        color: "#a855f7",
    },
    {
        value: "fuchsia",
        label: "Fuchsia",
        color: "#d946ef",
    },
    {
        value: "pink",
        label: "Pink",
        color: "#ec4899",
    },
    {
        value: "rose",
        label: "Rose",
        color: "#f43f5e",
    },
];

export const subjectCardColors = {
    borderColor: {
        slate: "border-slate-300 dark:border-slate-800",
        gray: "border-gray-300 dark:border-gray-800",
        zinc: "border-zinc-300 dark:border-zinc-800",
        neutral: "border-neutral-300 dark:border-neutral-800",
        stone: "border-stone-300 dark:border-stone-800",
        red: "border-red-300 dark:border-red-800",
        orange: "border-orange-300 dark:border-orange-800",
        amber: "border-amber-300 dark:border-amber-800",
        yellow: "border-yellow-300 dark:border-yellow-800",
        lime: "border-lime-300 dark:border-lime-800",
        green: "border-green-300 dark:border-green-800",
        emerald: "border-emerald-300 dark:border-emerald-800",
        teal: "border-teal-300 dark:border-teal-800",
        cyan: "border-cyan-300 dark:border-cyan-800",
        sky: "border-sky-300 dark:border-sky-800",
        blue: "border-blue-300 dark:border-blue-800",
        indigo: "border-indigo-300 dark:border-indigo-800",
        violet: "border-violet-300 dark:border-violet-800",
        purple: "border-purple-300 dark:border-purple-800",
        fuchsia: "border-fuchsia-300 dark:border-fuchsia-800",
        pink: "border-pink-300 dark:border-pink-800",
        rose: "border-rose-300 dark:border-rose-800",
    },
    bgColor: {
        slate: "bg-slate-400 dark:bg-slate-900",
        gray: "bg-gray-400 dark:bg-gray-900",
        zinc: "bg-zinc-400 dark:bg-zinc-900",
        neutral: "bg-neutral-400 dark:bg-neutral-900",
        stone: "bg-stone-400 dark:bg-stone-900",
        red: "bg-red-400 dark:bg-red-900",
        orange: "bg-orange-400 dark:bg-orange-900",
        amber: "bg-amber-400 dark:bg-amber-900",
        yellow: "bg-yellow-400 dark:bg-yellow-900",
        lime: "bg-lime-400 dark:bg-lime-900",
        green: "bg-green-400 dark:bg-green-900",
        emerald: "bg-emerald-400 dark:bg-emerald-900",
        teal: "bg-teal-400 dark:bg-teal-900",
        cyan: "bg-cyan-400 dark:bg-cyan-900",
        sky: "bg-sky-400 dark:bg-sky-900",
        blue: "bg-blue-400 dark:bg-blue-900",
        indigo: "bg-indigo-400 dark:bg-indigo-900",
        violet: "bg-violet-400 dark:bg-violet-900",
        purple: "bg-purple-400 dark:bg-purple-900",
        fuchsia: "bg-fuchsia-400 dark:bg-fuchsia-900",
        pink: "bg-pink-400 dark:bg-pink-900",
        rose: "bg-rose-400 dark:bg-rose-900",
    },
    borderColor2: {
        slate: "bg-slate-400 dark:bg-slate-900 border border-slate-700 dark:border-slate-500",
        gray: "bg-gray-400 dark:bg-gray-900 border border-gray-700 dark:border-gray-500",
        zinc: "bg-zinc-400 dark:bg-zinc-900 border border-zinc-700 dark:border-zinc-500",
        neutral:
            "bg-neutral-400 dark:bg-neutral-900 border border-neutral-700 dark:border-neutral-500",
        stone: "bg-stone-400 dark:bg-stone-900 border border-stone-700 dark:border-stone-500",
        red: "bg-red-400 dark:bg-red-900 border border-red-700 dark:border-red-500",
        orange: "bg-orange-400 dark:bg-orange-900 border border-orange-700 dark:border-orange-500",
        amber: "bg-amber-400 dark:bg-amber-900 border border-amber-700 dark:border-amber-500",
        yellow: "bg-yellow-400 dark:bg-yellow-900 border border-yellow-700 dark:border-yellow-500",
        lime: "bg-lime-400 dark:bg-lime-900 border border-lime-700 dark:border-lime-500",
        green: "bg-green-400 dark:bg-green-900 border border-green-700 dark:border-green-500",
        emerald:
            "bg-emerald-400 dark:bg-emerald-900 border border-emerald-700 dark:border-emerald-500",
        teal: "bg-teal-400 dark:bg-teal-900 border border-teal-700 dark:border-teal-500",
        cyan: "bg-cyan-400 dark:bg-cyan-900 border border-cyan-700 dark:border-cyan-500",
        sky: "bg-sky-400 dark:bg-sky-900 border border-sky-700 dark:border-sky-500",
        blue: "bg-blue-400 dark:bg-blue-900 border border-blue-700 dark:border-blue-500",
        indigo: "bg-indigo-400 dark:bg-indigo-900 border border-indigo-700 dark:border-indigo-500",
        violet: "bg-violet-400 dark:bg-violet-900 border border-violet-700 dark:border-violet-500",
        purple: "bg-purple-400 dark:bg-purple-900 border border-purple-700 dark:border-purple-500",
        fuchsia:
            "bg-fuchsia-400 dark:bg-fuchsia-900 border border-fuchsia-700 dark:border-fuchsia-500",
        pink: "bg-pink-400 dark:bg-pink-900 border border-pink-700 dark:border-pink-500",
        rose: "bg-rose-400 dark:bg-rose-900 border border-rose-700 dark:border-rose-500",
    },
    borderHover: {
        slate: "border-slate-500 hover:bg-slate-500 hover:text-white",
        gray: "border-gray-500 hover:bg-gray-500 hover:text-white",
        zinc: "border-zinc-500 hover:bg-zinc-500 hover:text-white",
        neutral: "border-neutral-500 hover:bg-neutral-500 hover:text-white",
        stone: "border-stone-500 hover:bg-stone-500 hover:text-white",
        red: "border-red-500 hover:bg-red-500 hover:text-white",
        orange: "border-orange-500 hover:bg-orange-500 hover:text-white",
        amber: "border-amber-500 hover:bg-amber-500 hover:text-white",
        yellow: "border-yellow-500 hover:bg-yellow-500 hover:text-white",
        lime: "border-lime-500 hover:bg-lime-500 hover:text-white",
        green: "border-green-500 hover:bg-green-500 hover:text-white",
        emerald: "border-emerald-500 hover:bg-emerald-500 hover:text-white",
        teal: "border-teal-500 hover:bg-teal-500 hover:text-white",
        cyan: "border-cyan-500 hover:bg-cyan-500 hover:text-white",
        sky: "border-sky-500 hover:bg-sky-500 hover:text-white",
        blue: "border-blue-500 hover:bg-blue-500 hover:text-white",
        indigo: "border-indigo-500 hover:bg-indigo-500 hover:text-white",
        violet: "border-violet-500 hover:bg-violet-500 hover:text-white",
        purple: "border-purple-500 hover:bg-purple-500 hover:text-white",
        fuchsia: "border-fuchsia-500 hover:bg-fuchsia-500 hover:text-white",
        pink: "border-pink-500 hover:bg-pink-500 hover:text-white",
        rose: "border-rose-500 hover:bg-rose-500 hover:text-white",
    },
    countState: {
        slate: "bg-slate-500 dark:bg-slate-700 border-slate-600",
        gray: "bg-gray-500 dark:bg-gray-700 border-gray-600",
        zinc: "bg-zinc-500 dark:bg-zinc-700 border-zinc-600",
        neutral: "bg-neutral-500 dark:bg-neutral-700 border-neutral-600",
        stone: "bg-stone-500 dark:bg-stone-700 border-stone-600",
        red: "bg-red-500 dark:bg-red-700 border-red-600",
        orange: "bg-orange-500 dark:bg-orange-700 border-orange-600",
        amber: "bg-amber-500 dark:bg-amber-700 border-amber-600",
        yellow: "bg-yellow-500 dark:bg-yellow-700 border-yellow-600",
        lime: "bg-lime-500 dark:bg-lime-700 border-lime-600",
        green: "bg-green-500 dark:bg-green-700 border-green-600",
        emerald: "bg-emerald-500 dark:bg-emerald-700 border-emerald-600",
        teal: "bg-teal-500 dark:bg-teal-700 border-teal-600",
        cyan: "bg-cyan-500 dark:bg-cyan-700 border-cyan-600",
        sky: "bg-sky-500 dark:bg-sky-700 border-sky-600",
        blue: "bg-blue-500 dark:bg-blue-700 border-blue-600",
        indigo: "bg-indigo-500 dark:bg-indigo-700 border-indigo-600",
        violet: "bg-violet-500 dark:bg-violet-700 border-violet-600",
        purple: "bg-purple-500 dark:bg-purple-700 border-purple-600",
        fuchsia: "bg-fuchsia-500 dark:bg-fuchsia-700 border-fuchsia-600",
        pink: "bg-pink-500 dark:bg-pink-700 border-pink-600",
        rose: "bg-rose-500 dark:bg-rose-700 border-rose-600",
    },
    cardState: {
        slate: "bg-slate-400 border-slate-500 dark:bg-slate-900 dark:border-slate-700",
        gray: "bg-gray-400 border-gray-500 dark:bg-gray-900 dark:border-gray-700",
        zinc: "bg-zinc-400 border-zinc-500 dark:bg-zinc-900 dark:border-zinc-700",
        neutral: "bg-neutral-400 border-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
        stone: "bg-stone-400 border-stone-500 dark:bg-stone-900 dark:border-stone-700",
        red: "bg-red-400 border-red-500 dark:bg-red-900 dark:border-red-700",
        orange: "bg-orange-400 border-orange-500 dark:bg-orange-900 dark:border-orange-700",
        amber: "bg-amber-400 border-amber-500 dark:bg-amber-900 dark:border-amber-700",
        yellow: "bg-yellow-400 border-yellow-500 dark:bg-yellow-900 dark:border-yellow-700",
        lime: "bg-lime-400 border-lime-500 dark:bg-lime-900 dark:border-lime-700",
        green: "bg-green-400 border-green-500 dark:bg-green-900 dark:border-green-700",
        emerald: "bg-emerald-400 border-emerald-500 dark:bg-emerald-900 dark:border-emerald-700",
        teal: "bg-teal-400 border-teal-500 dark:bg-teal-900 dark:border-teal-700",
        cyan: "bg-cyan-400 border-cyan-500 dark:bg-cyan-900 dark:border-cyan-700",
        sky: "bg-sky-400 border-sky-500 dark:bg-sky-900 dark:border-sky-700",
        blue: "bg-blue-400 border-blue-500 dark:bg-blue-900 dark:border-blue-700",
        indigo: "bg-indigo-400 border-indigo-500 dark:bg-indigo-900 dark:border-indigo-700",
        violet: "bg-violet-400 border-violet-500 dark:bg-violet-900 dark:border-violet-700",
        purple: "bg-purple-400 border-purple-500 dark:bg-purple-900 dark:border-purple-700",
        fuchsia: "bg-fuchsia-400 border-fuchsia-500 dark:bg-fuchsia-900 dark:border-fuchsia-700",
        pink: "bg-pink-400 border-pink-500 dark:bg-pink-900 dark:border-pink-700",
        rose: "bg-rose-400 border-rose-500 dark:bg-rose-900 dark:border-rose-700",
    },
    bgColor2: {
        slate: "bg-slate-500 dark:bg-slate-800",
        gray: "bg-gray-500 dark:bg-gray-800",
        zinc: "bg-zinc-500 dark:bg-zinc-800",
        neutral: "bg-neutral-500 dark:bg-neutral-800",
        stone: "bg-stone-500 dark:bg-stone-800",
        red: "bg-red-500 dark:bg-red-800",
        orange: "bg-orange-500 dark:bg-orange-800",
        amber: "bg-amber-500 dark:bg-amber-800",
        yellow: "bg-yellow-500 dark:bg-yellow-800",
        lime: "bg-lime-500 dark:bg-lime-800",
        green: "bg-green-500 dark:bg-green-800",
        emerald: "bg-emerald-500 dark:bg-emerald-800",
        teal: "bg-teal-500 dark:bg-teal-800",
        cyan: "bg-cyan-500 dark:bg-cyan-800",
        sky: "bg-sky-500 dark:bg-sky-800",
        blue: "bg-blue-500 dark:bg-blue-800",
        indigo: "bg-indigo-500 dark:bg-indigo-800",
        violet: "bg-violet-500 dark:bg-violet-800",
        purple: "bg-purple-500 dark:bg-purple-800",
        fuchsia: "bg-fuchsia-500 dark:bg-fuchsia-800",
        pink: "bg-pink-500 dark:bg-pink-800",
        rose: "bg-rose-500 dark:bg-rose-800",
    },
    teacherDetail: {
        slate: "rounded-full bg-slate-500 dark:bg-slate-800 hover-shadow hover:bg-slate-500 dark:hover:bg-slate-600 hover:border-slate-700 dark:hover:border-slate-500 border-2 border-slate-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        gray: "rounded-full bg-gray-500 dark:bg-gray-800 hover-shadow hover:bg-gray-500 dark:hover:bg-gray-600 hover:border-gray-700 dark:hover:border-gray-500 border-2 border-gray-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        zinc: "rounded-full bg-zinc-500 dark:bg-zinc-800 hover-shadow hover:bg-zinc-500 dark:hover:bg-zinc-600 hover:border-zinc-700 dark:hover:border-zinc-500 border-2 border-zinc-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        neutral:
            "rounded-full bg-neutral-500 dark:bg-neutral-800 hover-shadow hover:bg-neutral-500 dark:hover:bg-neutral-600 hover:border-neutral-700 dark:hover:border-neutral-500 border-2 border-neutral-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        stone: "rounded-full bg-stone-500 dark:bg-stone-800 hover-shadow hover:bg-stone-500 dark:hover:bg-stone-600 hover:border-stone-700 dark:hover:border-stone-500 border-2 border-stone-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        red: "rounded-full bg-red-500 dark:bg-red-800 hover-shadow hover:bg-red-500 dark:hover:bg-red-600 hover:border-red-700 dark:hover:border-red-500 border-2 border-red-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        orange: "rounded-full bg-orange-500 dark:bg-orange-800 hover-shadow hover:bg-orange-500 dark:hover:bg-orange-600 hover:border-orange-700 dark:hover:border-orange-500 border-2 border-orange-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        amber: "rounded-full bg-amber-500 dark:bg-amber-800 hover-shadow hover:bg-amber-500 dark:hover:bg-amber-600 hover:border-amber-700 dark:hover:border-amber-500 border-2 border-amber-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        yellow: "rounded-full bg-yellow-500 dark:bg-yellow-800 hover-shadow hover:bg-yellow-500 dark:hover:bg-yellow-600 hover:border-yellow-700 dark:hover:border-yellow-500 border-2 border-yellow-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        lime: "rounded-full bg-lime-500 dark:bg-lime-800 hover-shadow hover:bg-lime-500 dark:hover:bg-lime-600 hover:border-lime-700 dark:hover:border-lime-500 border-2 border-lime-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        green: "rounded-full bg-green-500 dark:bg-green-800 hover-shadow hover:bg-green-500 dark:hover:bg-green-600 hover:border-green-700 dark:hover:border-green-500 border-2 border-green-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        emerald:
            "rounded-full bg-emerald-500 dark:bg-emerald-800 hover-shadow hover:bg-emerald-500 dark:hover:bg-emerald-600 hover:border-emerald-700 dark:hover:border-emerald-500 border-2 border-emerald-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        teal: "rounded-full bg-teal-500 dark:bg-teal-800 hover-shadow hover:bg-teal-500 dark:hover:bg-teal-600 hover:border-teal-700 dark:hover:border-teal-500 border-2 border-teal-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        cyan: "rounded-full bg-cyan-500 dark:bg-cyan-800 hover-shadow hover:bg-cyan-500 dark:hover:bg-cyan-600 hover:border-cyan-700 dark:hover:border-cyan-500 border-2 border-cyan-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        sky: "rounded-full bg-sky-500 dark:bg-sky-800 hover-shadow hover:bg-sky-500 dark:hover:bg-sky-600 hover:border-sky-700 dark:hover:border-sky-500 border-2 border-sky-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        blue: "rounded-full bg-blue-500 dark:bg-blue-800 hover-shadow hover:bg-blue-500 dark:hover:bg-blue-600 hover:border-blue-700 dark:hover:border-blue-500 border-2 border-blue-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        indigo: "rounded-full bg-indigo-500 dark:bg-indigo-800 hover-shadow hover:bg-indigo-500 dark:hover:bg-indigo-600 hover:border-indigo-700 dark:hover:border-indigo-500 border-2 border-indigo-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        violet: "rounded-full bg-violet-500 dark:bg-violet-800 hover-shadow hover:bg-violet-500 dark:hover:bg-violet-600 hover:border-violet-700 dark:hover:border-violet-500 border-2 border-violet-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        purple: "rounded-full bg-purple-500 dark:bg-purple-800 hover-shadow hover:bg-purple-500 dark:hover:bg-purple-600 hover:border-purple-700 dark:hover:border-purple-500 border-2 border-purple-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        fuchsia:
            "rounded-full bg-fuchsia-500 dark:bg-fuchsia-800 hover-shadow hover:bg-fuchsia-500 dark:hover:bg-fuchsia-600 hover:border-fuchsia-700 dark:hover:border-fuchsia-500 border-2 border-fuchsia-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        pink: "rounded-full bg-pink-500 dark:bg-pink-800 hover-shadow hover:bg-pink-500 dark:hover:bg-pink-600 hover:border-pink-700 dark:hover:border-pink-500 border-2 border-pink-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        rose: "rounded-full bg-rose-500 dark:bg-rose-800 hover-shadow hover:bg-rose-500 dark:hover:bg-rose-600 hover:border-rose-700 dark:hover:border-rose-500 border-2 border-rose-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
    },
    accessState: {
        slate: "rounded-full bg-slate-200 dark:bg-slate-800 hover-shadow hover:bg-slate-500 dark:hover:bg-slate-600 hover:border-slate-700 dark:hover:border-slate-500 border-2 border-slate-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        gray: "rounded-full bg-gray-200 dark:bg-gray-800 hover-shadow hover:bg-gray-500 dark:hover:bg-gray-600 hover:border-gray-700 dark:hover:border-gray-500 border-2 border-gray-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        zinc: "rounded-full bg-zinc-200 dark:bg-zinc-800 hover-shadow hover:bg-zinc-500 dark:hover:bg-zinc-600 hover:border-zinc-700 dark:hover:border-zinc-500 border-2 border-zinc-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        neutral:
            "rounded-full bg-neutral-200 dark:bg-neutral-800 hover-shadow hover:bg-neutral-500 dark:hover:bg-neutral-600 hover:border-neutral-700 dark:hover:border-neutral-500 border-2 border-neutral-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        stone: "rounded-full bg-stone-200 dark:bg-stone-800 hover-shadow hover:bg-stone-500 dark:hover:bg-stone-600 hover:border-stone-700 dark:hover:border-stone-500 border-2 border-stone-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        red: "rounded-full bg-red-200 dark:bg-red-800 hover-shadow hover:bg-red-500 dark:hover:bg-red-600 hover:border-red-700 dark:hover:border-red-500 border-2 border-red-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        orange: "rounded-full bg-orange-200 dark:bg-orange-800 hover-shadow hover:bg-orange-500 dark:hover:bg-orange-600 hover:border-orange-700 dark:hover:border-orange-500 border-2 border-orange-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        amber: "rounded-full bg-amber-200 dark:bg-amber-800 hover-shadow hover:bg-amber-500 dark:hover:bg-amber-600 hover:border-amber-700 dark:hover:border-amber-500 border-2 border-amber-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        yellow: "rounded-full bg-yellow-200 dark:bg-yellow-800 hover-shadow hover:bg-yellow-500 dark:hover:bg-yellow-600 hover:border-yellow-700 dark:hover:border-yellow-500 border-2 border-yellow-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        lime: "rounded-full bg-lime-200 dark:bg-lime-800 hover-shadow hover:bg-lime-500 dark:hover:bg-lime-600 hover:border-lime-700 dark:hover:border-lime-500 border-2 border-lime-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        green: "rounded-full bg-green-200 dark:bg-green-800 hover-shadow hover:bg-green-500 dark:hover:bg-green-600 hover:border-green-700 dark:hover:border-green-500 border-2 border-green-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        emerald:
            "rounded-full bg-emerald-200 dark:bg-emerald-800 hover-shadow hover:bg-emerald-500 dark:hover:bg-emerald-600 hover:border-emerald-700 dark:hover:border-emerald-500 border-2 border-emerald-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        teal: "rounded-full bg-teal-200 dark:bg-teal-800 hover-shadow hover:bg-teal-500 dark:hover:bg-teal-600 hover:border-teal-700 dark:hover:border-teal-500 border-2 border-teal-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        cyan: "rounded-full bg-cyan-200 dark:bg-cyan-800 hover-shadow hover:bg-cyan-500 dark:hover:bg-cyan-600 hover:border-cyan-700 dark:hover:border-cyan-500 border-2 border-cyan-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        sky: "rounded-full bg-sky-200 dark:bg-sky-800 hover-shadow hover:bg-sky-500 dark:hover:bg-sky-600 hover:border-sky-700 dark:hover:border-sky-500 border-2 border-sky-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        blue: "rounded-full bg-blue-200 dark:bg-blue-800 hover-shadow hover:bg-blue-500 dark:hover:bg-blue-600 hover:border-blue-700 dark:hover:border-blue-500 border-2 border-blue-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        indigo: "rounded-full bg-indigo-200 dark:bg-indigo-800 hover-shadow hover:bg-indigo-500 dark:hover:bg-indigo-600 hover:border-indigo-700 dark:hover:border-indigo-500 border-2 border-indigo-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        violet: "rounded-full bg-violet-200 dark:bg-violet-800 hover-shadow hover:bg-violet-500 dark:hover:bg-violet-600 hover:border-violet-700 dark:hover:border-violet-500 border-2 border-violet-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        purple: "rounded-full bg-purple-200 dark:bg-purple-800 hover-shadow hover:bg-purple-500 dark:hover:bg-purple-600 hover:border-purple-700 dark:hover:border-purple-500 border-2 border-purple-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        fuchsia:
            "rounded-full bg-fuchsia-200 dark:bg-fuchsia-800 hover-shadow hover:bg-fuchsia-500 dark:hover:bg-fuchsia-600 hover:border-fuchsia-700 dark:hover:border-fuchsia-500 border-2 border-fuchsia-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        pink: "rounded-full bg-pink-200 dark:bg-pink-800 hover-shadow hover:bg-pink-500 dark:hover:bg-pink-600 hover:border-pink-700 dark:hover:border-pink-500 border-2 border-pink-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
        rose: "rounded-full bg-rose-200 dark:bg-rose-800 hover-shadow hover:bg-rose-500 dark:hover:bg-rose-600 hover:border-rose-700 dark:hover:border-rose-500 border-2 border-rose-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary",
    },
};

export const showPicture = (picture, useBaseUrl = true) => {
    if (!useBaseUrl) {
        modal.message({ icon: `${picture}` });
    } else {
        modal.message({ icon: `${baseURL}/${picture}` });
    }
};

export const videoSource = (source) => {
    return `${baseURL}/videos/${source}`;
};

export const bookSource = (source) => {
    return `${baseURL}/${source}`;
};

let platformsToExport = [
    { value: "upload", text: "رفع" },
    { value: "youtube", text: "يوتيوب" },
    { value: "vimeo", text: "فيميو" },
    { value: "ink", text: "إنكربت فيديو" },
    { value: "vdocipher", text: "فيديو سايفر" },
];

if (isBunny) {
    platformsToExport.push({ value: "bunny", text: "باني" });
}
if (isKillerPlayer) {
    platformsToExport.push({ value: "killer_player", text: "Killer Player" });
}

export const platforms = platformsToExport;

export const getPlatformPlaceHolder = (value) => {
    let platforms = {
        upload: "رفع",
        youtube: "يوتيوب",
        vimeo: "فيميو",
        ink: "إنكربت فيديو",
        vdocipher: "فيديو سايفر",
    };
    if (isBunny) {
        platforms["bunny"] = "باني";
    }
    if (isKillerPlayer) {
        platforms["killer_player"] = "Killer Player";
    }
    return platforms[value];
};
