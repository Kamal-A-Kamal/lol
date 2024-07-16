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
import modal from "../../services/modalServices";

const initialState = {
    questions: "",
    level: "high",
    shuffle_answers: 0,
    division_id: 0,

    year: 3,

    partition_id: 0,
    partition_name: "",

    submit_type: 0,
    question_id: 0,
};

const QuestionInsertAuto = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        getDivisions();
        getPartitions();
        setData({ ...data, division_id: 0, partition_id: 0, question_id: 0 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.year]);

    useEffect(() => {
        let fields = [];

        fields = [
            ...fields,
            {
                id: "questions",
                placeholder: "الأسئلة",
                type: "textarea",
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

        setInputFields(fields);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        divisions,
        partitions,
        data.division_id,
        data.partition_id,
        partitionFormLoading,
        titleField,
    ]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);
            const crudApiEndPoint = "/api/questions";
            const crudItemName = "السؤال";
            handleFormSubmit(e, setIsLoading, setErrors, () => {
                insertAuto();
            });
            // handleCrud(
            //     config,
            //     data,
            //     crudApiEndPoint,
            //     crudItemName,
            //     setIsLoading,
            //     setErrors,
            //     setData,
            //     initialState,
            //     data.question_id
            // );
        });
    };
    const insertAuto = async () => {
        try {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);

            const toSendData = { ...data };
            // toSendData["phone"] = parseInt(data["phone"]);
            const { data: response } = await http.post(
                "/api/questions/insert_auto",
                toSendData,
                config
            );

            modal.message({
                title: "تم تنفيذ طلبك بنجاح",
                text: response.message,
                // button: "مشاهدة نتيجة العملية",
                // callback: () => {
                //     window.scrollTo(0, 0);
                // },
            });
            setData(initialState);
            setIsLoading(false);
        } catch ({ response }) {
            handleFormErrors(response, setIsLoading, setErrors);
        }
    };
    return (
        <AdminContainer>
            <AdminForm onSubmit={handleSubmit} isLoading={isLoading} buttonText="اضافة">
                <div className="-my-8 clr-text-secondary font-small">
                    {/* لتفعيل أكثر من رقم في نفس الوقت اترك <span className="underline">مسافة</span>{" "}
                    بين كل رقم و الآخر
                    <br />
                    أو <span className="underline">انسخ</span> الأرقام من ملف اكسل */}
                    <div>يتم وضع علامة '@' قبل رأس كل سؤال</div>
                    <div>
                        و يتم وضع علاممة '#' قبل كل اجابة و علامة '##' قبل الاجابة الصحيحة فقط
                    </div>
                    <div>مثال :</div>
                    <div>@السؤال الأول : اختر الاجابة الصحيحة :</div>
                    <div>#الاجابة الاولى</div>
                    <div>##الاجابة الثانية و الصحيحة</div>
                    <div>#الاجابة الثالثة</div>
                    <div>#الاجابة الرابعة</div>
                    ثم يتم نسخ الاسئلة و وضعها كلها متتالية في مربع النص
                </div>
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

export default QuestionInsertAuto;
