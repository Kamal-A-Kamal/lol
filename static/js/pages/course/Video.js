import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenerateVideo from "../../components/ui/GenerateVideo";
import LoadingIcon from "../../components/ui/LoadingIcon";
import auth from "../../services/authServices";
import http from "../../services/httpServices";
// import modal from "../../services/modalServices";
import { isObjectEmpty } from "../../utils/objects";
import SectionableHeaderTitle from "../../components/ui/SectionableHeaderTitle";
import CenterIcon from "../../components/ui/CenterIcon";

const Video = () => {
    const { id, section_id, video_id } = useParams();

    const [video, setVideo] = useState({});
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const getVideo = async () => {
        const token = auth.getToken();
        const config = auth.getAdminAuthConfig(token);
        try {
            const { data: repsone } = await http.get(
                `/api/sellables/course/${id}/sections/${section_id}/sectionables/${video_id}`,
                config
            );
            setVideo(repsone);
        } catch ({ response }) {
            if (response.status === 439) {
                navigate("../../");
            }
            setIsError(true);
        }
    };

    useEffect(() => {
        getVideo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <SectionableHeaderTitle sectionable_id={video_id} />
            <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-large overflow-hidden border border-secondary-container smooth clr-text-primary">
                {isError ? (
                    <div className="py-10 flex space-x-3 space-x-reverse flex-center-both font-h2 bg-rose-900 bg-opacity-50 clr-white">
                        <span className="flex-center-both font-big dark:text-rose-500 text-rose-900 smooth">
                            <CenterIcon icon="bxs:error" />
                        </span>
                        <span>حدث خطأ ...</span>
                    </div>
                ) : isObjectEmpty(video) ? (
                    <div className="py-10 flex space-x-3 space-x-reverse flex-center-both font-h2">
                        <span className="flex-center-both font-big text-yellow-300">
                            <LoadingIcon />
                        </span>
                        <span>يتم الآن تحميل الفيديو ...</span>
                    </div>
                ) : (
                    <div className="">
                        <GenerateVideo video={video.sectionable} />
                    </div>
                )}
            </div>
        </>
    );
};

export default Video;
