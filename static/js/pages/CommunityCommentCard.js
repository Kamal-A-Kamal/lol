import React, { useContext, useRef, useState } from "react";
import CenterIcon from "../components/ui/CenterIcon";
import { description, printRelativeDate } from "../utils/ar";
import { baseURL } from "../config";
import { showPicture } from "../services/contentServices";
import LoadingIcon from "../components/ui/LoadingIcon";
import auth from "../services/authServices";
import http from "../services/httpServices";
import AuthContext from "../context/AuthContext";
import Button from "../components/ui/Button";

const CommunityCommentCard = ({ comment, posts, post, category, setPosts }) => {
    const imageSrcRef = useRef();
    const { adminToken } = useContext(AuthContext);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const handlePostAction = async (action = "delete") => {
        const token = auth.getAdminToken();
        const config = auth.getAuthConfig(token);
        setIsLoading(true);

        try {
            if (action === "delete") {
                const { data } = await http.delete(
                    `/api/community/community_categories/${category.id}/posts/${post.id}/comments/${comment.id}`,
                    config
                );
                let newComments = post.community_comments.filter(
                    (value) => value.id !== comment.id
                );
                console.log(newComments);

                let newPosts = posts.map((value) => {
                    if (value.id !== post.id) {
                        return value;
                    } else {
                        return {
                            ...post,
                            community_comments: newComments,
                        };
                    }
                });

                setPosts([...newPosts]);
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };
    return (
        <div className="bg-primary-container clr-text-primary smooth rounded-2xl">
            <div className="flex justify-between items-center">
                <div className="flex-center-both p-2 space-x-2 space-x-reverse">
                    <div className="sm:w-10 w-7 sm:h-10 h-7 rounded-full bg-cyan-100 dark:bg-cyan-700 flex-center-both smooth">
                        <CenterIcon
                            className="w-full h-full text-cyan-800 dark:text-cyan-400 smooth "
                            iconProperties={{ className: "h-3/4 w-3/4" }}
                            icon="uim:comment"
                        />
                    </div>
                    {/* <div className="">{post.user.full_name}</div> */}
                    <div className="space-y-1">
                        <div className="font-w-bold">{comment.user.full_name}</div>
                        <div className="clr-text-secondary smooth font-smaller flex space-x-1 space-x-reverse">
                            <CenterIcon icon="icon-park-twotone:time" className="pt-0.5" />
                            <span>{printRelativeDate(comment.created_at)}</span>
                        </div>
                    </div>
                </div>

                {adminToken ? (
                    <div className="flex-center-both pl-5">
                        <Button
                            color="rose"
                            onClick={() => handlePostAction("delete")}
                            isLoading={isLoading}
                        >
                            حذف
                        </Button>
                    </div>
                ) : (
                    ""
                )}
            </div>
            <div className="px-5">
                <div className="h-0.5 bg-secondary-container w-full rounded-md smooth"></div>
            </div>
            <div className="py-5 sm:px-2 px-5">{description(comment.description, true)}</div>
            {comment.image_source ? (
                <div className="pb-5 px-2">
                    <div className="w-full rounded-md relative overflow-hidden text-center h-[200px]">
                        <img
                            src={`${baseURL}/${comment.image_source}`}
                            alt="course"
                            ref={imageSrcRef}
                            onLoad={() => {
                                setIsImageLoading(false);
                            }}
                            className={` ${
                                isImageLoading ? "hidden " : ""
                            } h-full max-w-full cursor-pointer rounded-md`}
                            onClick={() => showPicture(imageSrcRef.current.src, false)}
                        />
                        {isImageLoading ? (
                            <div className="h-full bg-slate-300 dark:bg-slate-50/10 flex-center-both font-h1 font-w-bold">
                                <div className="flex flex-row space-x-3 space-x-reverse">
                                    <LoadingIcon className={"font-big text-blue-500"} />
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default CommunityCommentCard;
