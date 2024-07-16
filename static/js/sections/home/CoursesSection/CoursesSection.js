import React, { useEffect, useState } from "react";

import { ScrollingProvider } from "../../../context/ScrollingContext";

import SectionHead from "../../../components/ui/SectionHead";

// import year1 from "../../../../assets/year-2.jpeg";
// import Waves from "../../../components/ui/Waves";
import Categorie from "./Categorie";
import auth from "../../../services/authServices";
import http from "../../../services/httpServices";
import LoadingIcon from "./../../../components/ui/LoadingIcon";

const CoursesSection = ({ title = false, year = 3 }) => {
    // const { token } = useContext(AuthContext);

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        const { data } = await http.get("/api/categories_info", config);
        setCategories(data);
    };

    useEffect(() => {
        if (year == 3) {
            getCategories();
        }
    }, [year]);

    return (
        <div className="relative mb-20 overflow-hidden" id="courses">
            <ScrollingProvider>
                <SectionHead title={title ? title : "الكورسات"} />
            </ScrollingProvider>

            {year == 3 ? (
                <>
                    {categories.length > 0 ? (
                        categories.map((categorie) =>
                            categorie.courses.length ? (
                                <Categorie
                                    key={categorie.id}
                                    api={`/api/categories/${categorie.id}/sellables`}
                                    titleFirst={categorie.titleFirst}
                                    titleLast={categorie.titleLast}
                                />
                            ) : null
                        )
                    ) : (
                        <div className="text-center">
                            <LoadingIcon className="text-4xl text-blue-700 mt-20 mb-5" /> <br />
                            <span className="text-xl">جاري تحميل الكورسات</span>
                        </div>
                    )}
                </>
            ) : (
                <Categorie
                    isToHide={false}
                    titleFirst="أحدث"
                    titleLast="الكورسات"
                    api={`/api/sellables/year/${year}`}
                />
            )}
            {/* <Categorie titleFirst="كل" titleLast="الكورسات" api={`/api/sellables`} /> */}
            {/*  */}

            {/* <Waves className="fill-rose-200" /> */}
            {/* <div className="py-16 bg-rose-200"></div> */}
        </div>
    );
};

export default CoursesSection;
