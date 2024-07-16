import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import auth from "../../../services/authServices";
import modal from "../../../services/modalServices";
import http from "../../../services/httpServices";
import { toast } from "react-toastify";

const IncreaseCustomUserVideoLimitButton = ({ video, user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = () => {
        setIsLoading(true);
        modal.message({
            title: "هل انت متأكد؟",
            icon: "info",
            text: "هل انت متأكد من زيادة عدد مرات مشاهده الطالب ؟",
            buttons: {
                cancel: "الرجوع",
                confirm: "حسنًا",
            },
            callback: (e) => {
                if (e && e !== "cancel") {
                    handleIncrease();
                } else {
                    setIsLoading(false);
                }
            },
        });
    };
    const handleIncrease = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        try {
            const { data: response } = await http.post(
                `/api/users/${user.id}/increase_custom_user_video_limit`,
                {
                    sectionable_type: "video",
                    sectionable_id: video.id,
                    limit_name: "video_view_limit",
                },
                config
            );

            modal.message({
                title: `عملية ناجحة`,
                icon: "success",
                text: `تم تنفيذ العملية بنجاح , عدد مرات مشاهدة الطالب الآن : ${response.new_limit}`,
            });

            setIsLoading(false);
        } catch (error) {
            toast(error.response.data);
        }
    };
    return (
        <Button onClick={handleSubmit} isLoading={isLoading}>
            زيادة عدد المرات
        </Button>
    );
};

export default IncreaseCustomUserVideoLimitButton;
