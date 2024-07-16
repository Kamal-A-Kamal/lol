import { Switch } from "@headlessui/react";
import React, { useEffect, useRef } from "react";
import CenterIcon from "../../ui/CenterIcon";

import FlexRowReverse from "../../ui/FlexRowReverse";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { getOptionTexts, remapOptionsTextToLabel } from "../../../utils/objects";
import Btns from "./Btns";

import ShowImage from "./ShowImage";

const animatedComponents = makeAnimated();
const InputField = ({
    id = "",
    placeholder = "",
    icon = "",
    value = "",
    type = "text",
    onChange,
    className = "",
    togglePassword = false,
    options = null,
    error = "",
    isDisabled = false,
    data = {},
    setData = null,
    errors = {},
    multiple = false,
    visible = true,
    isRequired = true,
    returnInputRef = () => null,
    inputProps = {},
    ...props
}) => {
    const inputRef = useRef(null);
    useEffect(() => {
        returnInputRef(inputRef);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (
        (id === "password" || id === "password_confirmation") &&
        type === "text" &&
        !togglePassword
    ) {
        type = "password";
    }
    if (type === "br") {
        <div className={`${className ? className : "px-5"}`}>
            <div className="h-1 bg-secondary-container smooth rounded-md w-full"></div>
        </div>;
    } else if (type === "btns") {
        return (
            <>
                <div className={`${className}`}>
                    <Btns data={data} setData={setData} {...props} />
                </div>
            </>
        );
    } else if (type === "html") {
        return (
            <>
                <div className={`${className}`}>
                    <div>{placeholder}</div>
                </div>
            </>
        );
    } else if (type === "datetime") {
        return (
            <>
                <div className={`${className} ${visible ? "" : "hidden"}`}>
                    <span>{placeholder}</span>
                    <div
                        className={`form-reg__group ${errors[id] && "error"} ${
                            isDisabled && "disabled"
                        } `}
                        {...props}
                    >
                        <input
                            className={`smooth z-10`}
                            onChange={!isDisabled ? (e) => onChange(e, id, data, setData) : null}
                            type="datetime-local"
                            required={isRequired}
                            id={id}
                            value={data[id]}
                            disabled={isDisabled}
                        />
                        <span className="bg"></span>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                    </div>
                    {errors[id] && (
                        <div className="pb-3 pt-1">
                            <div className="font-small text-white bg-rose-500 bg-opacity-70 rounded-md px-3 py-2">
                                {typeof errors[id] === "object" ? (
                                    <div>- {errors[id][0]}</div>
                                ) : (
                                    <div>- {errors[id]}</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    } else if (type === "file") {
        return (
            <>
                <div className={`relative ${className}`}>
                    <div
                        className={`form-reg__group relative ${errors[id] && "error"} ${
                            isDisabled && "disabled"
                        } `}
                        {...props}
                    >
                        <div
                            className="file-upload-wrapper relative h-[50px] w-full flex-center-both rounded-lg smooth hover:border-opacity-20 hover:border-cyan-500 after:rounded-l-md before:rounded-r-md"
                            data-text={
                                data[id] ? data[id].name : placeholder ? placeholder : "ارفع الصورة"
                            }
                        >
                            <input
                                id={id}
                                type="file"
                                className="smooth z-10 file-upload-field"
                                required={isRequired}
                                disabled={isDisabled}
                                // defaultValue={data[id]}
                                onChange={
                                    !isDisabled
                                        ? (e) => {
                                              //   setfileDataText(
                                              //       e.currentTarget.value.split("\\").slice(-1)
                                              //   );
                                              onChange(e, id, data, setData);
                                          }
                                        : null
                                }
                                {...inputProps}
                            />
                        </div>
                    </div>
                    {data[id] ? <ShowImage file={data[id]} /> : ""}
                    {errors[id] && (
                        <div className="pb-3 pt-1">
                            <div className="font-small text-white bg-rose-500 bg-opacity-70 rounded-md px-3 py-2">
                                {typeof errors[id] === "object" ? (
                                    <div>- {errors[id][0]}</div>
                                ) : (
                                    <div>- {errors[id]}</div>
                                )}
                            </div>
                        </div>
                    )}
                    <div
                        className={`w-full h-full inset-0 bg-inner-container z-10 opacity-90 smooth ${
                            isDisabled ? "absolute" : "hidden"
                        } `}
                    ></div>
                </div>
            </>
        );
    } else if (type === "textarea") {
        return (
            <>
                <div className={`${className}`}>
                    <div
                        className={`form-reg__group ${errors[id] && "error"} ${
                            isDisabled && "disabled"
                        } `}
                        {...props}
                    >
                        <textarea
                            className="smooth z-10"
                            onChange={!isDisabled ? (e) => onChange(e, id, data, setData) : null}
                            type={type}
                            required={isRequired}
                            id={id}
                            value={data[id] ?? ""}
                            disabled={isDisabled}
                            ref={inputRef}
                        >
                            {data[id]}
                        </textarea>
                        <span className="bg"></span>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        {!isDisabled && (
                            <label>
                                <FlexRowReverse>
                                    {icon}
                                    <span>{placeholder}</span>
                                </FlexRowReverse>
                            </label>
                        )}
                    </div>
                    {errors[id] && (
                        <div className="pb-3 pt-1">
                            <div className="font-small text-white bg-rose-500 bg-opacity-70 rounded-md px-3 py-2">
                                {typeof errors[id] === "object" ? (
                                    <div>- {errors[id][0]}</div>
                                ) : (
                                    <div>- {errors[id]}</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    } else if (type === "switch") {
        return (
            <div className={`for-reg__group flex justify-between relative ${className}`}>
                <div className="font-h3 flex-center-both smooth clr-text-primary">
                    <span>{placeholder}</span>
                </div>
                <Switch
                    checked={!isDisabled && value ? value : data[id]}
                    disabled={isDisabled}
                    onChange={(value) =>
                        onChange(
                            {
                                currentTarget: {
                                    value: !isDisabled && value ? 1 : 0,
                                    type: "checkbox",
                                    id,
                                },
                            },
                            id,
                            data,
                            setData
                        )
                    }
                    className={`${
                        (!isDisabled && value ? value : data[id]) ? "bg-cyan-900" : "bg-slate-200"
                    }  relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 ar`}
                >
                    <span className="sr-only">Enable notifications</span>
                    <span
                        className={`${
                            (!isDisabled && value ? value : data[id])
                                ? "-translate-x-9"
                                : "translate-x-0"
                        }  pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out flex-center-both`}
                    >
                        <CenterIcon
                            className={`text-slate-90 font-h1 text-cyan-600 transition duration-200 ${
                                (!isDisabled && value ? value : data[id])
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                            icon="typcn:tick"
                        />
                    </span>
                </Switch>
                <div
                    className={`w-full h-full inset-0 bg-inner-container z-10 opacity-90 smooth rounded-md ${
                        isDisabled ? "absolute" : "hidden"
                    } `}
                ></div>
            </div>
        );
    } else if (type === "select") {
        let selectValue;

        // const selectStyles = {
        //     container: (base, state) => ({
        //         ...base,
        //         zIndex: "999",
        //     }),
        // };

        const optionsTexts = getOptionTexts(options);
        if (multiple) {
            selectValue = data[id].map((value) => {
                return { value, label: optionsTexts[value] };
            });
        } else {
            if (data[id]) {
                selectValue = { value: data[id], label: optionsTexts[data[id]] };
            }
        }
        return (
            <div className={`react-select__outer-container relative ${className}`}>
                <Select
                    id={id}
                    value={selectValue}
                    placeholder={placeholder}
                    defaultValue={placeholder}
                    options={remapOptionsTextToLabel(options)}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({
                            ...base,
                            zIndex: 9999,
                        }),
                        option: (base) => ({
                            ...base,
                            // background: "var(--color-primary-container)",
                            borderRadius: "5px",
                            marginBottom: "3px",
                            marginTop: "3px",
                        }),
                    }}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            neutral0: "var(--color-primary-container)",
                            primary: "var(--color-text-primary)",
                            primary25: "var(--color-secondary-container)",
                            primary50: "var(--color-third-container)",
                        },
                    })}
                    // onChange={!isDisabled ? (e) => console.log(e) : null}
                    onChange={
                        !isDisabled
                            ? (value) =>
                                  onChange(
                                      {
                                          currentTarget: {
                                              id,
                                              type,
                                              value,
                                              isMulti: multiple,
                                          },
                                      },
                                      id,
                                      data,
                                      setData
                                  )
                            : null
                    }
                    isDisabled={isDisabled}
                    isMulti={multiple}
                    // loadOptions={options}
                    required={isRequired}
                    components={animatedComponents}
                    isRtl={true}
                    isSearchable={true}
                    // closeMenuOnSelect={false}
                />
                {errors[id] && (
                    <div className="pb-3 pt-1">
                        <div className="font-small text-white bg-rose-500 bg-opacity-70 rounded-md px-3 py-2">
                            {typeof errors[id] === "object" ? (
                                <div>- {errors[id][0]}</div>
                            ) : (
                                <div>- {errors[id]}</div>
                            )}
                        </div>
                    </div>
                )}
                <div
                    className={`w-full h-full inset-0 bg-inner-container z-10 opacity-90 smooth ${
                        isDisabled ? "absolute" : "hidden"
                    } `}
                ></div>
            </div>
        );
    }
    return (
        <>
            <div className={`${className}`}>
                <div
                    className={`form-reg__group ${errors[id] && "error"} ${
                        isDisabled && "disabled"
                    } `}
                    {...props}
                >
                    <input
                        ref={inputRef}
                        className="smooth z-10"
                        onChange={!isDisabled ? (e) => onChange(e, id, data, setData) : null}
                        type={type}
                        required={isRequired}
                        id={id}
                        value={data[id] ?? ""}
                        disabled={isDisabled}
                    />
                    <span className="bg"></span>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    {!isDisabled && (
                        <label>
                            <FlexRowReverse>
                                {icon}
                                <span>{placeholder}</span>
                            </FlexRowReverse>
                        </label>
                    )}
                </div>
                {errors[id] && (
                    <div className="pb-3 pt-1">
                        <div className="font-small text-white bg-rose-500 bg-opacity-70 rounded-md px-3 py-2">
                            {typeof errors[id] === "object" ? (
                                <div>- {errors[id][0]}</div>
                            ) : (
                                <div>- {errors[id]}</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default InputField;
