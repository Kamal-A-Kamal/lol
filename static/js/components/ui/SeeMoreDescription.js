import React, { useState } from "react";
import { description } from "../../utils/ar";

const SeeMoreDescription = ({ value }) => {
    const [isSeeMore, setIsSeeMore] = useState(false);
    if (value.length < 149) {
        return description(value);
    }
    return (
        <>
            {description(
                isSeeMore ? value : value.substring(0, 149),
                false,
                isSeeMore ? (
                    <span
                        className="underline font-w-bold rounded-md bg-slate-100 dark:bg-slate-900 bg-opacity-10 dark:bg-opacity-20 smooth px-2 cursor-pointer"
                        onClick={() => setIsSeeMore(!isSeeMore)}
                    >
                        ... عرض تفاصيل أقل
                    </span>
                ) : (
                    <span
                        className="underline font-w-bold rounded-md bg-slate-100 dark:bg-slate-900 bg-opacity-10 dark:bg-opacity-20 smooth px-2 cursor-pointer"
                        onClick={() => setIsSeeMore(!isSeeMore)}
                    >
                        ... عرض باقي التفاصيل
                    </span>
                )
            )}
            {/* {isSeeMore ? (
                "... عرض المزيد"
            ) : (
                <span className="underline font-w-bold rounded-md bg-slate-100 dark:bg-slate-900 bg-opacity-10 dark:bg-opacity-20 smooth px-2 cursor-pointer border-2 border-current">
                    ... عرض باقي التفاصيل
                </span>
            )} */}
        </>
    );
};

export default SeeMoreDescription;
