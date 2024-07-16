/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import AdminForm from "../../components/ui/AdminForm";
import InputIcon from "../../components/form/elements/InputIcon";
import { isBtns, isMultiYear } from "../../services/defaultSettings";
import { years } from "../../services/yearSevices";
import {
    handleCrud,
    handleFormErrors,
    handleFormSubmit,
    handleInputChange as handleChange,
    renderInputFields,
} from "../../services/formServices";
import auth from "../../services/authServices";
import http from "../../services/httpServices";

import { submitTypes } from "../../services/adminServices";
import ShowImage from "../../components/form/elements/ShowImage";

const initialState = {
    title: "",
    to_edit_picture: 0,
    have_picture: 0,
    picture: "",
    level: "high",
    shuffle_answers: 0,
    answer_1: "",
    answer_2: "",
    answer_3: "",
    answer_4: "",
    correct_answer: 0,
    division_id: 0,
    year: 3,

    partition_id: 0,
    partition_name: "",

    submit_type: 0,
    question_id: 0,
};

const QuestionEditing = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [questionPicture, setQuestionPicture] = useState("");

    const [divisions, setDivisions] = useState([]);
    const [partitions, setPartitions] = useState([]);
    const [questions, setQuestions] = useState([]);

    const [partitionFormLoading, setPartitionFormLoadingFormLoading] = useState(false);

    const [inputFields, setInputFields] = useState([]);

    const [titleField, setTitleField] = useState([]);

    const handlePartitionAdd = async (e, id, data, setData) => {
        setPartitionFormLoadingFormLoading(true);
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        try {
            const { data: response } = await http.post(
                `/api/partitions`,
                { year: data.year, partition_name: data.partition_name },
                config
            );
            getDivisions();
            setData({ ...data, partition_id: response.division.id });

            setPartitionFormLoadingFormLoading(false);
        } catch ({ response }) {
            handleFormErrors(response, setPartitionFormLoadingFormLoading, setErrors, false);
        }
    };

    const getDivisions = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/years/${data.year}/divisions/options`,
            config
        );

        setDivisions(response);
    };

    const getPartitions = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/years/${data.year}/partitions/options`,
            config
        );

        setPartitions(response);
    };

    const getQuestions = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/partitions/${data.partition_id}/questions/options`,
            config
        );
        // const { data: response } = await http.get(
        //     `/api/divisions/${data.division_id}/questions/options`,
        //     config
        // );

        setQuestions(response);
    };
    const getQuestionData = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/questions/${data.question_id}`, config);

        let result = {};
        Object.keys(response).forEach((element) => {
            if (
                [
                    "title",
                    "answer_1",
                    "answer_2",
                    "answer_3",
                    "answer_4",
                    "correct_answer",
                    "shuffle_answers",
                    "level",
                    "have_picture",
                ].includes(element)
            ) {
                result[element] = response[element];
            }
        });

        setQuestionPicture(response.picture);
        setData({ ...data, ...result, have_picture: 0, picture: "", to_edit_picture: 0 });
    };
    useEffect(() => {
        getDivisions();
        getPartitions();
        setData({ ...data, division_id: 0, partition_id: 0, question_id: 0 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.year]);
    useEffect(() => {
        if (data.submit_type !== "store" && data.partition_id > 0) {
            getQuestions();
            setData({ ...data, question_id: 0 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.partition_id, data.submit_type]);

    useEffect(() => {
        if (data.question_id > 0 && data.submit_type && data.submit_type !== "store") {
            getQuestionData();
            setData({ ...data, have_picture: 0, picture: "", to_edit_picture: 0 });
        }
    }, [data.partition_id, data.choosen_year, data.submit_type, data.question_id]);

    useEffect(() => {
        let fields = [
            {
                id: "submit_type",
                placeholder: "هتعمل ايه دلوقتي",
                type: "select",
                options: submitTypes,
            },
        ];
        if (data.submit_type) {
            if (data.submit_type !== "store" && data.submit_type) {
                if (isMultiYear) {
                    fields = [
                        ...fields,
                        {
                            id: "year",
                            placeholder: "اختر الصف الدراسي",
                            type: "select",
                            options: years,
                        },
                    ];
                }
                fields = [
                    ...fields,
                    {
                        id: "partition_id",
                        placeholder: "اختر مجموعة الأسئلة",
                        type: "select",
                        options: partitions,
                    },
                ];
                // fields = [
                //     ...fields,
                //     {
                //         id: "division_id",
                //         placeholder: "اختر قسم الموقع",
                //         type: "select",
                //         options: divisions,
                //     },
                // ];
                fields = [
                    ...fields,
                    {
                        id: "question_id",
                        placeholder: "اختر السؤال",
                        type: "select",
                        options: questions,
                    },
                ];

                if (data.submit_type === "update") {
                    if (data.question_id > 0) {
                        fields = [
                            ...fields,
                            {
                                id: "title",
                                placeholder: "العنوان",
                                icon: <InputIcon icon="ant-design:question-circle-twotone" />,
                                returnInputRef: (ref) => setTitleField(ref.current),
                            },
                        ];

                        if (isBtns) {
                            fields = [
                                ...fields,
                                {
                                    // id: "title",
                                    type: "btns",
                                    input: titleField,
                                    // icon: <InputIcon icon="ant-design:question-circle-twotone" />,
                                },
                            ];
                        }
                        fields = [
                            ...fields,
                            {
                                element: "html",
                                input: questionPicture ? (
                                    <ShowImage path={questionPicture} isPath={true} />
                                ) : (
                                    <></>
                                ),
                            },
                            {
                                id: "answer_1",
                                placeholder: "الاجابة الأولى",
                                icon: <InputIcon icon="fluent:app-title-24-filled" />,
                            },
                            {
                                id: "answer_2",
                                placeholder: "الاجابة الثانية",
                                icon: <InputIcon icon="fluent:app-title-24-filled" />,
                            },
                            {
                                id: "answer_3",
                                placeholder: "الاجابة الثالثة",
                                icon: <InputIcon icon="fluent:app-title-24-filled" />,
                            },
                            {
                                id: "answer_4",
                                placeholder: "الاجابة الرابعة",
                                icon: <InputIcon icon="fluent:app-title-24-filled" />,
                            },
                            {
                                id: "correct_answer",
                                placeholder: "الاجابة الصحيحة",
                                type: "select",
                                options: [
                                    { value: 1, text: data.answer_1 },
                                    { value: 2, text: data.answer_2 },
                                    { value: 3, text: data.answer_3 },
                                    { value: 4, text: data.answer_4 },
                                ],
                            },
                            {
                                id: "shuffle_answers",
                                placeholder: "ترتيب عشوائي للإجابات",
                                type: "switch",
                            },
                            {
                                id: "to_edit_picture",
                                placeholder: "تعديل صورة السؤال؟",
                                type: "switch",
                            },
                            {
                                id: "have_picture",
                                placeholder: "رفع صورة",
                                type: "switch",
                                isDisabled: !data.to_edit_picture,
                            },
                            {
                                id: "picture",
                                placeholder: "الصورة",
                                type: "file",
                                isDisabled: !data.have_picture || !data.to_edit_picture,
                            },
                        ];
                    }
                }
            }
            if (data.submit_type === "store") {
                if (isMultiYear) {
                    fields = [
                        ...fields,
                        {
                            id: "year",
                            placeholder: "اختر الصف الدراسي",
                            type: "select",
                            options: years,
                        },
                    ];
                }
                fields = [
                    ...fields,
                    {
                        id: "title",
                        placeholder: "العنوان",
                        icon: <InputIcon icon="ant-design:question-circle-twotone" />,
                        returnInputRef: (ref) => setTitleField(ref.current),
                    },
                ];

                if (isBtns) {
                    fields = [
                        ...fields,
                        {
                            // id: "title",
                            type: "btns",
                            input: titleField,
                            // icon: <InputIcon icon="ant-design:question-circle-twotone" />,
                        },
                    ];
                }
                fields = [
                    ...fields,
                    {
                        id: "answer_1",
                        placeholder: "الاجابة الأولى",
                        icon: <InputIcon icon="fluent:app-title-24-filled" />,
                    },
                    {
                        id: "answer_2",
                        placeholder: "الاجابة الثانية",
                        icon: <InputIcon icon="fluent:app-title-24-filled" />,
                    },
                    {
                        id: "answer_3",
                        placeholder: "الاجابة الثالثة",
                        icon: <InputIcon icon="fluent:app-title-24-filled" />,
                    },
                    {
                        id: "answer_4",
                        placeholder: "الاجابة الرابعة",
                        icon: <InputIcon icon="fluent:app-title-24-filled" />,
                    },
                    {
                        id: "correct_answer",
                        placeholder: "الاجابة الصحيحة",
                        type: "select",
                        options: [
                            { value: 1, text: data.answer_1 },
                            { value: 2, text: data.answer_2 },
                            { value: 3, text: data.answer_3 },
                            { value: 4, text: data.answer_4 },
                        ],
                    },
                    {
                        id: "shuffle_answers",
                        placeholder: "ترتيب عشوائي للإجابات",
                        type: "switch",
                    },
                    {
                        id: "have_picture",
                        placeholder: "رفع صورة",
                        type: "switch",
                    },
                    {
                        id: "picture",
                        placeholder: "الصورة",
                        type: "file",
                        isDisabled: !data.have_picture,
                    },
                    {
                        id: "division_id",
                        placeholder: "اختر قسم الموقع",
                        type: "select",
                        options: divisions,
                    },
                    {
                        id: "partition_id",
                        placeholder: "اختر مجموعة الاسئلة",
                        options: partitions,
                        type: "select",
                    },
                ];
                if (divisions.length < 1) {
                    fields = [
                        ...fields,
                        {
                            id: "partition_name",
                            placeholder: "مجموعة الاسئلة",
                            icon: <InputIcon icon="uil:folder-question" />,
                        },
                        {
                            id: "partition_add_button",
                            isLoading: partitionFormLoading,
                            onClick: handlePartitionAdd,
                            element: "button",
                            placeholder: "اضافة المجموعة",
                        },
                    ];
                }
            }
        }

        setInputFields(fields);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        divisions,
        partitions,
        questions,
        data.division_id,
        data.partition_id,
        data.question_id,
        data.submit_type,
        data.answer_1,
        data.answer_2,
        data.answer_3,
        data.answer_4,
        questionPicture,
        data.to_edit_picture,
        data.have_picture,
        data.picture,
        partitionFormLoading,
        titleField,
    ]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);
            const crudApiEndPoint = "/api/questions";
            const crudItemName = "السؤال";
            handleCrud(
                config,
                data,
                crudApiEndPoint,
                crudItemName,
                setIsLoading,
                setErrors,
                setData,
                initialState,
                data.question_id
            );
        });
    };
    return (
        <AdminContainer>
            <AdminForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                buttonText="auto"
                submitType={data.submit_type}
            >
                {inputFields.map((input, key) =>
                    renderInputFields(
                        key,
                        input.handleChange ? input.handleChange : handleChange,
                        data,
                        setData,
                        errors,
                        input
                    )
                )}
            </AdminForm>
        </AdminContainer>
    );
};

export default QuestionEditing;
