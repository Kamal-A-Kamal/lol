import React, { useContext, useState } from "react";
import Form from "../components/form/elements/Form";
import InputField from "../components/form/elements/InputField";
import Button from "../components/ui/Button";
import auth from "../services/authServices";
import {
    getFormData,
    handleFormErrors,
    handleFormSubmit,
    handleInputChange,
} from "../services/formServices";
import http from "../services/httpServices";
import AuthContext from "../context/AuthContext";

const initialState = {
    description: "",
    file: "",
};

const CommunityCreateCommentForm = ({ category, posts, setPosts, post }) => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isShownAddComment, setIsShownAddComment] = useState(false);

    const { user } = useContext(AuthContext);
    const handleSubmit = async (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, async () => {
            setIsLoading(true);
            const token = auth.getToken();
            const config = auth.getAuthConfig(token);
            try {
                const formData = getFormData(data);
                let { data: response } = await http.post(
                    `/api/community_categories/${category["id"]}/posts/${post["id"]}/comments`,
                    formData,
                    config
                );
                response = {
                    ...response,
                    user: { full_name: user.full_name },
                };
                setPosts(
                    posts.map((item) => {
                        if (item.id !== post.id) {
                            return item;
                        }
                        item.community_comments_count++;
                        item.community_comments = [response, ...item.community_comments];
                        return item;
                    })
                );
                setIsLoading(false);
                setIsShownAddComment(false);
                setData(initialState);
            } catch ({ response }) {
                handleFormErrors(response, setIsLoading, setErrors, false);
            }
        });
    };
    return (
        <>
            {category.is_closed || post.is_closed ? (
                ""
            ) : isShownAddComment ? (
                <div className="py-2">
                    <Form
                        className="flex-center-both w-full max-w-xl mx-auto p-5 rounded-md bg-third-container clr-text-primary smooth shadow-medium"
                        onSubmit={handleSubmit}
                    >
                        <div className="w-full space-y-4">
                            <InputField
                                id="description"
                                type="textarea"
                                placeholder="اكتب تعليق"
                                setData={setData}
                                data={data}
                                errors={errors}
                                onChange={handleInputChange}
                            />

                            <div className="space-y-2">
                                <div className="">هل تريد ارفاق صورة؟</div>
                                <InputField
                                    id="image"
                                    type="file"
                                    placeholder="ارفق صورة"
                                    isRequired={false}
                                    inputProps={{ accept: "image/png, image/gif, image/jpeg" }}
                                    setData={setData}
                                    data={data}
                                    errors={errors}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex-center-both">
                                <Button color="cyan" isLoading={isLoading}>
                                    {"ارسال التعليق"}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            ) : (
                <div className="flex-center-both pt-2 -mb-6">
                    <Button color="cyan" onClick={() => setIsShownAddComment(!isShownAddComment)}>
                        اترك تعليقًا !
                    </Button>
                </div>
            )}
        </>
    );
};

export default CommunityCreateCommentForm;
