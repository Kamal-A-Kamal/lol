import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingIcon from "../../components/ui/LoadingIcon";
import auth from "../../services/authServices";
import http from "../../services/httpServices";
// import modal from "../../services/modalServices";
import { isObjectEmpty } from "../../utils/objects";

import { bookSource } from "../../services/contentServices";
// import { Document, Page, pdfjs } from "react-pdf";
import Button from "../../components/ui/Button";
import SectionableHeaderTitle from "../../components/ui/SectionableHeaderTitle";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Book = () => {
    const { id, section_id, book_id } = useParams();

    const [book, setBook] = useState({});

    const getBook = async () => {
        const token = auth.getToken();
        const config = auth.getAdminAuthConfig(token);
        try {
            const { data: repsone } = await http.get(
                `/api/sellables/course/${id}/sections/${section_id}/sectionables/${book_id}`,
                config
            );
            setBook(repsone);
            // navigate(bookSource(repsone.sellable.source));
        } catch ({ response }) {}
    };

    useEffect(() => {
        getBook();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // useEffect(() => {
    //     if (!isObjectEmpty(book) && book.sectionable) {
    //         const source = bookSource(book.sectionable.source);
    //         window.location.href = source;
    //     }
    // }, [book]);

    return (
        <div>
            <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-large overflow-hidden border border-secondary-container smooth clr-text-primary -mt-20 relative z-30 bg-primary-container">
                <SectionableHeaderTitle sectionable_id={book_id} />
                {isObjectEmpty(book) ? (
                    <div className="py-10 flex space-x-3 space-x-reverse flex-center-both font-h2">
                        <span className="flex-center-both font-big text-yellow-300">
                            <LoadingIcon />
                        </span>
                        <span>يتم الآن تحميل الملف ...</span>
                    </div>
                ) : (
                    <div className="p-10 space-y-10">
                        <div className="font-h1 font-w-bold">
                            اضغط{" "}
                            <Button
                                className="underline bg-primary-container border-0 text-teal-500 px-1"
                                hoverEffect="hover:text-rose-500"
                                element="a"
                                href={`${
                                    !isObjectEmpty(book) && book.sectionable
                                        ? bookSource(book.sectionable.source)
                                        : "#"
                                }`}
                                target="_blank"
                            >
                                هنا
                            </Button>{" "}
                            لفتح الملف !
                        </div>
                        <div className="">
                            <Button
                                className="block w-full flex-center-both"
                                element="a"
                                href={`${
                                    !isObjectEmpty(book) && book.sectionable
                                        ? bookSource(book.sectionable.source)
                                        : "#"
                                }`}
                                target="_blank"
                            >
                                فتح الملف
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Book;
