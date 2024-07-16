import React, { useContext, useEffect, useState } from "react";
import auth from "../services/authServices";
import http from "../services/httpServices";
import LoadingIcon from "../components/ui/LoadingIcon";
import CenterIcon from "../components/ui/CenterIcon";
import { useParams } from "react-router-dom";
import CommunityCreatePostForm from "./CommunityCreatePostForm";
import CommunityPostCard from "./CommunityPostCard";
import Button from "../components/ui/Button";
import { printUnit } from "../utils/ar";
import AuthContext from "../context/AuthContext";

const CommunityCategories = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [category, setCategory] = useState({});
    const [isCommunityLoading, setIsCommunityLoading] = useState(true);
    const [fetchingAdminPostsLoading, isfetchingAdminPostsLoading] = useState(false);
    const [isPendingPostsFetched, setisPendingPostsFetched] = useState(false);

    const [showMyPosts, setShowMyPosts] = useState(false);
    const [myPosts, setMyPosts] = useState([]);

    const [posts, setPosts] = useState([]);

    const [isShowPendingPosts, setIsShowPendingPosts] = useState(false);
    // const [community]

    const { community_category_id } = useParams();

    const { adminToken } = useContext(AuthContext);

    const getPosts = async () => {
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);

        // const { data } = http.get("/");
        try {
            const { data } = await http.get(
                `/api/visible/community_categories/${community_category_id}/posts`,
                config
            );
            setPosts({});
            setPosts(data);
            setIsLoading(false);
        } catch (error) {
            setIsError(true);
        }
    };
    const getCategory = async () => {
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);

        // const { data } = http.get("/");
        try {
            const { data } = await http.get(`/api/get_categorie/${community_category_id}`, config);
            setCategory({});
            setCategory(data);
            setMyPosts(data.user_posts);
            setIsCommunityLoading(false);
        } catch (error) {
            setIsError(true);
        }
    };
    const fetchAdminPendingPosts = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAuthConfig(token);
        setCategory({ ...category, community_posts: [] });
        isfetchingAdminPostsLoading(true);

        // const { data } = http.get("/");
        try {
            const { data } = await http.get(
                `/api/community/community_categories/${community_category_id}/show_pending_posts`,
                config
            );
            setCategory({ ...category, community_posts: data });
            setIsShowPendingPosts(true);
            isfetchingAdminPostsLoading(false);
            setisPendingPostsFetched(true);
        } catch (error) {
            setIsError(true);
            setisPendingPostsFetched(true);
        }
    };
    useEffect(() => {
        getCategory();
        getPosts();
    }, [community_category_id]);
    return (
        <>
            <div className="absolute top-0 -translate-y-full flex-center-both w-full">
                <div className="flex-center-both flex-col space-y-5 pb-10">
                    <div className="font-w-bold text-white font-h1">{category.name}</div>
                    <Button color="yellow" element="Link" to="../">
                        العودة للخلف
                    </Button>
                </div>
            </div>
            {isLoading ? (
                <div className="flex-center-both py-10">
                    <div
                        className={`${
                            isError ? "bg-rose-500" : "bg-cyan-500"
                        } rounded-md py-10 px-5 flex-center-both space-x-3 space-x-reverse font-h3 text-slate-50`}
                    >
                        {isError ? (
                            <>
                                <CenterIcon icon="ic:twotone-error" className="font-h1 pt-1" />
                                <span>حدث خطأ</span>
                            </>
                        ) : (
                            <>
                                <LoadingIcon className="font-h1" />
                                <span>يتم الآن تحميل المواضيع...</span>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <div>
                        {isCommunityLoading ? (
                            <LoadingIcon className="font-h1 text-cyan-500 p-5" />
                        ) : (
                            <>
                                {adminToken ? (
                                    isPendingPostsFetched ? (
                                        <>
                                            <div className="text-center font-w-bold underline pt-10 pb-5">
                                                يوجد{" "}
                                                {printUnit(
                                                    category.community_posts.length,
                                                    "موضوع"
                                                )}{" "}
                                                قيد المراجعة داخل المجموعة
                                            </div>
                                            <div className="flex-center-both">
                                                <Button
                                                    color="blue"
                                                    onClick={() =>
                                                        setIsShowPendingPosts(!isShowPendingPosts)
                                                    }
                                                >
                                                    {isShowPendingPosts
                                                        ? "إخفاء المواضيع قيد المراجعة"
                                                        : "اظهار المواضيع قيد المراجعة"}
                                                </Button>
                                            </div>
                                            <div className="py-2"></div>
                                            {isShowPendingPosts ? (
                                                <div className="flex flex-col w-full space-y-10 py-5 px-1 md:px-5 bg-sky-500 bg-opacity-20 smooth max-w-2xl mx-auto rounded-md  ">
                                                    {category.community_posts.map((post) => (
                                                        <CommunityPostCard
                                                            setCategory={setCategory}
                                                            key={post.id}
                                                            post={post}
                                                            posts={posts}
                                                            setPosts={setPosts}
                                                            category={category}
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            <div className="py-2"></div>
                                        </>
                                    ) : (
                                        <div className="flex-center-both py-4 flex-col space-y-2">
                                            <Button
                                                color="rose"
                                                onClick={fetchAdminPendingPosts}
                                                isLoading={fetchingAdminPostsLoading}
                                            >
                                                الذهاب للمواضيع قيد المراجعة
                                            </Button>
                                        </div>
                                    )
                                ) : (
                                    <>
                                        {category.community_posts.length > 0 ? (
                                            <div className="flex-center-both py-4 flex-col space-y-2">
                                                <div className="text-centet font-w-bold underline">
                                                    لديك{" "}
                                                    {printUnit(
                                                        category.community_posts.length,
                                                        "موضوع"
                                                    )}{" "}
                                                    قيد المراجعة
                                                </div>
                                                {isShowPendingPosts ? (
                                                    <div className="flex flex-col w-full space-y-10 py-5 px-1 md:px-5 bg-sky-500 bg-opacity-20 smooth max-w-2xl mx-auto rounded-md">
                                                        {category.community_posts.map((post) => (
                                                            <CommunityPostCard
                                                                setCategory={setCategory}
                                                                key={post.id}
                                                                post={post}
                                                                posts={posts}
                                                                setPosts={setPosts}
                                                                category={category}
                                                            />
                                                        ))}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                <Button
                                                    color="yellow"
                                                    onClick={() =>
                                                        setIsShowPendingPosts(!isShowPendingPosts)
                                                    }
                                                >
                                                    {isShowPendingPosts
                                                        ? "إخفاء المواضيع قيد المراجعة"
                                                        : "اظهار المواضيع قيد المراجعة"}
                                                </Button>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </>
                                )}

                                <CommunityCreatePostForm
                                    category={category}
                                    setCategory={setCategory}
                                    posts={posts}
                                    setPosts={setPosts}
                                />
                            </>
                        )}
                    </div>
                    <div className="py-10">
                        <div className="text-center font-w-bold underline max-w-2xl mx-auto">
                            <div>
                                انت نشرت{" "}
                                <span className="text-cyan-500">
                                    {printUnit(myPosts.length, "موضوع")}
                                </span>{" "}
                                داخل المجموعة
                            </div>
                        </div>
                        <div className="flex-center-both py-3">
                            <Button color="yellow" onClick={() => setShowMyPosts(!showMyPosts)}>
                                {!showMyPosts ? "اظهار موضوعاتي فقط" : "اخفاء موضوعاتي فقط"}
                            </Button>
                        </div>

                        {showMyPosts ? (
                            <div className="flex flex-col w-full space-y-10 py-5 px-1 md:px-5 bg-yellow-500 bg-opacity-20 smooth max-w-2xl mx-auto rounded-md">
                                {myPosts.map((post) => (
                                    <CommunityPostCard
                                        setCategory={setCategory}
                                        key={post.id}
                                        post={post}
                                        posts={myPosts}
                                        setPosts={setMyPosts}
                                        category={category}
                                    />
                                ))}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    {posts.length < 1 ? (
                        <div className="flex-center-both py-10">
                            <div
                                className={`bg-yellow-600 rounded-md py-10 px-5 flex-center-both space-x-3 space-x-reverse font-h3 text-slate-50`}
                            >
                                <>
                                    <CenterIcon icon="carbon:error" className="font-h1 pt-1" />
                                    <span>لم يتم نشر مواضيع داخل هذه المجموعة</span>
                                </>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="py-10">
                                <div className="text-left font-w-bold underline max-w-2xl mx-auto">
                                    <div>
                                        يوجد{" "}
                                        <span className="text-cyan-500">
                                            {printUnit(posts.length, "موضوع")}
                                        </span>{" "}
                                        داخل المجموعة
                                    </div>
                                </div>
                                <div className="flex flex-col w-full space-y-10 py-5 px-1 md:px-5 bg-sky-500 bg-opacity-20 smooth max-w-2xl mx-auto rounded-md">
                                    {posts.map((post) => (
                                        <CommunityPostCard
                                            setCategory={setCategory}
                                            key={post.id}
                                            post={post}
                                            posts={posts}
                                            setPosts={setPosts}
                                            category={category}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default CommunityCategories;
