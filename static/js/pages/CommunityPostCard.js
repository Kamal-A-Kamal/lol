import React, { useContext, useRef, useState } from "react";
import CenterIcon from "../components/ui/CenterIcon";
import { description, printRelativeDate, printUnit } from "../utils/ar";
import CommunityCreateCommentForm from "./CommunityCreateCommentForm";
import CommunityCommentCard from "./CommunityCommentCard";
import AuthContext from "../context/AuthContext";
import Button from "../components/ui/Button";
import auth from "../services/authServices";
import http from "../services/httpServices";
import LoadingIcon from "../components/ui/LoadingIcon";
import { baseURL } from "../config";
import { showPicture } from "../services/contentServices";
import { comment } from "postcss";

const CommunityPostCard = ({ post, posts, setPosts, category, setCategory }) => {
    const { adminToken } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const imageSrcRef = useRef();

    const handlePostAction = async (action = "approve") => {
        const token = auth.getAdminToken();
        const config = auth.getAuthConfig(token);
        setIsLoading(true);

        try {
            if (action === "delete") {
                const { data } = await http.delete(
                    `/api/community/community_categories/${category.id}/posts/${post.id}`,
                    config
                );
                let communinty_category_pending_posts = category.community_posts.filter(
                    (value) => value.id !== post.id
                );
                setCategory({
                    ...category,
                    community_posts: [...communinty_category_pending_posts],
                });

                let newPosts = posts.filter((value) => value.id !== post.id);

                setPosts([...newPosts]);
            } else if (action === "approve") {
                const { data } = await http.post(
                    `/api/community/community_categories/${category.id}/posts/${post.id}/approve`,
                    {},
                    config
                );
                let newPost = category.community_posts.filter((value) => value.id === post.id);
                newPost[0].is_approved = true;
                let communinty_category_pending_posts = category.community_posts.filter(
                    (value) => value.id !== post.id
                );
                setCategory({
                    ...category,
                    community_posts: [...communinty_category_pending_posts],
                });
                let newPosts = [...newPost, ...posts];
                setPosts(newPosts);
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };
    return (
        <div className="bg-primary-container clr-text-primary smooth rounded-2xl">
            <div className="flex justify-between items-center w-full">
                <div className="flex-center-both p-2 space-x-2 space-x-reverse">
                    <div className="sm:w-10 w-7 sm:h-10 h-7 rounded-full bg-cyan-100 dark:bg-cyan-700 flex-center-both smooth">
                        <CenterIcon
                            className="w-full h-full text-cyan-800 dark:text-cyan-400 smooth "
                            iconProperties={{ className: "h-3/4 w-3/4" }}
                            icon="iconamoon:profile-fill"
                        />
                    </div>
                    {/* <div className="">{post.user.full_name}</div> */}
                    <div className="space-y-1">
                        <div className="font-w-bold">{post.user.full_name}</div>
                        <div className="clr-text-secondary smooth font-smaller flex space-x-1 space-x-reverse">
                            <CenterIcon icon="icon-park-twotone:time" className="pt-0.5" />
                            <span>
                                {printRelativeDate(post.created_at)}
                                {post.is_approved ? (
                                    ""
                                ) : (
                                    <>
                                        {" - "}
                                        <span className="text-cyan-500 opacity-70 underline">
                                            قيد المراجعة
                                        </span>
                                    </>
                                )}
                            </span>
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
            <div className="py-5 sm:px-2 px-5">{description(post.description, true)}</div>
            {post.image_source ? (
                <div className="py-5">
                    <div className="w-full rounded-md relative overflow-hidden text-center h-[400px]">
                        <img
                            src={`${baseURL}/${post.image_source}`}
                            alt="course"
                            ref={imageSrcRef}
                            onLoad={() => {
                                setIsImageLoading(false);
                            }}
                            className={` ${
                                isImageLoading ? "hidden " : ""
                            } h-full max-w-full mx-auto cursor-pointer`}
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

            {post.is_approved ? (
                <>
                    <div className="px-5">
                        <div className="flex items-center justify-end">
                            <div className="font-smaller clr-text-secondary smooth py-2">
                                {printUnit(post.community_comments.length, "تعليق")}
                            </div>
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="h-0.5 bg-secondary-container w-full rounded-md smooth"></div>
                    </div>
                    <div className="py-2 flex-center-both clr-text-secondary smooth">التعليقات</div>
                    <div className="px-5">
                        <div className="h-0.5 bg-secondary-container w-full rounded-md smooth"></div>
                    </div>
                    <div className="space-y-5">
                        {post.is_closed ? (
                            ""
                        ) : (
                            <CommunityCreateCommentForm
                                posts={posts}
                                setPosts={setPosts}
                                category={category}
                                post={post}
                            />
                        )}
                        <div className="p-2">
                            <div className="sm:px-7 px-6 bg-third-container rounded-md py-4 space-y-2">
                                {post.community_comments.map((comment) => {
                                    return (
                                        <CommunityCommentCard
                                            posts={posts}
                                            setPosts={setPosts}
                                            category={category}
                                            post={post}
                                            key={comment.id}
                                            comment={comment}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
            ) : adminToken ? (
                <>
                    <div className="px-5">
                        <div className="h-0.5 bg-secondary-container w-full rounded-md smooth"></div>
                    </div>
                    <div className="flex-center-both space-x-2 space-x-reverse py-2">
                        <Button
                            color="cyan"
                            onClick={() => handlePostAction("approve")}
                            isLoading={isLoading}
                        >
                            قبول الموضوع و نشره
                        </Button>
                        <Button
                            color="rose"
                            onClick={() => handlePostAction("delete")}
                            isLoading={isLoading}
                        >
                            حذف الموضوع
                        </Button>
                    </div>
                    <div className="px-5">
                        <div className="h-0.5 bg-secondary-container w-full rounded-md smooth"></div>
                    </div>
                    <div className="space-y-5">
                        <CommunityCreateCommentForm
                            posts={category.community_posts}
                            setPosts={(posts) => {
                                // let newCommunityPosts =
                                setCategory({
                                    ...category,
                                    community_posts: posts,
                                });
                            }}
                            category={category}
                            post={post}
                        />
                        <div className="p-2">
                            <div className="sm:px-7 px-6 bg-third-container rounded-md py-4 space-y-2">
                                {post.community_comments.map((comment) => {
                                    return (
                                        <CommunityCommentCard
                                            posts={posts}
                                            setPosts={setPosts}
                                            category={category}
                                            post={post}
                                            key={comment.id}
                                            comment={comment}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default CommunityPostCard;
