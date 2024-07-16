import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminForm from "../../components/ui/AdminForm";
import auth from "../../services/authServices";
import {
    handleFormSubmit,
    renderInputFields,
    handleInputChange as handleChange,
} from "../../services/formServices";
import http from "../../services/httpServices";
import modal from "../../services/modalServices";
import AdminContainer from "../../components/ui/AdminContainer";
import { isMultiYear } from "../../services/defaultSettings";
import { years } from "../../services/yearSevices";

// const initialState = {
//     phone: "",
//     course_id: [],
//     is_all: false,
// };

const SelectCourseForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({
        year: 3,
        course_id: 0,
        search_phone: true,
    });

    const [errors, setErrors] = useState({});
    const [inputFields, setInputFields] = useState([]);
    const [courses, setCourses] = useState([]);

    const navigate = useNavigate();

    async function getCourses() {
        const adminToken = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(adminToken);

        const { data: response } = await http.get(
            `/api/years/${data.year}/courses/options`,
            config
        );
        setCourses(response);
    }

    useEffect(() => {
        getCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.year]);

    useEffect(() => {
        let fields = [];

        if (isMultiYear) {
            fields = [
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
                id: "course_id",
                placeholder: "اختر الكورس",
                options: courses,
                type: "select",
            },
        ];
        setInputFields(fields);
    }, [courses, data.year]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            if (data.course_id) {
                navigate(`./${data.course_id}`);
            } else {
                modal.message({ text: "يرجى اختيار الكورس" });
            }
        });
    };

    return (
        <AdminContainer>
            <AdminForm onSubmit={handleSubmit} isLoading={isLoading} buttonText="اختر">
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

export default SelectCourseForm;
