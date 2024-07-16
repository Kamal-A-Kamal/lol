import React from "react";
import { handleInputChange } from "../../../services/formServices";

const Btns = ({ onClick = null, data, setData, input }) => {
    const handleClick = (e) => {
        const content = e.currentTarget.querySelector("div").textContent.trim();
        if (content !== "EN") {
            const curPos = input.selectionStart;
            const currentVal = input.value;
            const textReplacement =
                currentVal.slice(0, curPos) + content + currentVal.slice(curPos);

            input.value = textReplacement;
            input.focus();
            input.setSelectionRange(curPos + 1, curPos + 1);
            handleInputChange({ currentTarget: input }, "", data, setData);
        } else {
            input.classList.toggle("en");
        }
    };
    return (
        <>
            <div className="txt-btns flex space-x-1 space-x-reverse justify-evenly mt-n3 mb-4 font-w-bold">
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-red-dark-1">→</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-red-dark-1">←</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-red-dark-1">⇌</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-red-dark-1">∆</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-red-dark-1">℃</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-red-dark-1">⁺</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-red-dark-1">⁻</div>
                </div>

                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn lg-change bg-yellow-dark-1">EN</div>
                </div>
            </div>
            <div className="txt-btns flex space-x-1 space-x-reverse justify-evenly mt-n3 mb-4 font-w-bold">
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">π</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">η</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">∑</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">Φ</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">λ</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">Ω</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">α</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">β</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">μ</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">δ</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-yellow-dark-1">∠</div>
                </div>
            </div>
            <div className="txt-btns flex space-x-1 space-x-reverse justify-evenly mt-n3 mb-4">
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-yellow-dark-1">σ</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-yellow-dark-1">θ</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-yellow-dark-1">∇</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-yellow-dark-1">₎</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-yellow-dark-1">₍</div>
                </div>

                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-yellow-dark-1">ₛ</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-yellow-dark-1">ₐ</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-yellow-dark-1">ₗ</div>
                </div>
            </div>

            <div className="txt-btns flex space-x-1 space-x-reverse justify-evenly mt-n3 mb-4 pl-1">
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">⁰</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">¹</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">²</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">³</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">⁴</div>
                </div>

                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">⁵</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">⁶</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">⁷</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">⁸</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-blue-dark-1">⁹</div>
                </div>
            </div>

            <div className="txt-btns flex space-x-1 space-x-reverse justify-evenly mt-n3 mb-4 pl-1">
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-green-dark-1">₀</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-green-dark-1">₁</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-green-dark-1">₂</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-green-dark-1">₃</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-green-dark-1">₄</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-green-dark-1">₅</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-green-dark-1">₆</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-green-dark-1">₇</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-green-dark-1">₈</div>
                </div>
                <div
                    onClick={handleClick}
                    className="flex-item cursor-pointer dark:bg-rose-900 bg-blue-300 smooth clr-text-primary shadow-xl hover-shadow font-cairo  flex-center-both rounded-md px-2 py-1 flex"
                >
                    <div className="txt-btn txt-input bg-green-dark-1">₉</div>
                </div>
            </div>
        </>
    );
};

export default Btns;
