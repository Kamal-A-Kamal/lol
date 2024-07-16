import React from "react";
import { useParams } from "react-router-dom";
import MainSection from "../sections/home/MainSection";
import { ScrollingProvider } from "../context/ScrollingContext";
import { getYearPlaceHolder } from "../services/yearSevices";
import CoursesSection from "../sections/home/CoursesSection/CoursesSection";
import AboutSection from "../sections/home/AboutSection";
import auth from "../services/authServices";
import Categorie from "../sections/home/CoursesSection/Categorie";
import SectionHead from "../components/ui/SectionHead";

const Year = () => {
    const { id } = useParams();

    const token = auth.getToken();

    return (
        <>
            {token ? (
                <>
                    <ScrollingProvider>
                        <SectionHead className="bg-stone-800 text-slate-100" title={"اشتراكاتك"} />
                    </ScrollingProvider>
                    <Categorie
                        api={`/api/sellables/subscribed`}
                        noCoursesPlaceholder="انت غير مشترك بأي كورس حتى الآن!"
                    />
                </>
            ) : (
                <>
                    <MainSection title={getYearPlaceHolder(id)} />
                    <ScrollingProvider>
                        <AboutSection />
                    </ScrollingProvider>
                </>
            )}
            <CoursesSection title={getYearPlaceHolder(id)} year={id} />
        </>
    );
};

export default Year;
