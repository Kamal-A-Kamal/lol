import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CourseContext from "../../context/CourseContext";

import auth from "../../services/authServices";
import http from "../../services/httpServices";
import payment from "../../services/paymentServices";

import Button from "../../components/ui/Button";
import CenterIcon from "../../components/ui/CenterIcon";
import Container from "../../components/ui/Container";
import FlexRowReverse from "../../components/ui/FlexRowReverse";
import LoadingIcon from "../../components/ui/LoadingIcon";
import { isObjectEmpty } from "../../utils/objects";
import { printFullDateTime } from "../../utils/time";
import modal from "../../services/modalServices";

const SubscriptionPreviousInvoices = () => {
    const { course } = useContext(CourseContext);
    const [invoices, setInvoices] = useState([]);

    // eslint-disable-next-line no-unused-vars
    const [placeholder, setPlaceholder] = useState(
        <div className="h-screen negative-nav-margin grow w-full flex-center-both font-h2 col-span-1 md:col-span-2 lg:col-span-3">
            <span className="flex-center-both space-x-3 space-x-reverse bg-teal-500 px-28 py-12 clr-white rounded-2xl">
                <LoadingIcon className={"font-big text-teal-800 dark:text-teal-400"} />
                <span>يتم الآن تحميل بيانات الكورس.....</span>
            </span>
        </div>
    );

    const navigate = useNavigate();

    const getPreviousInvoices = async () => {
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        try {
            const { data: result } = await http.post(
                `/api/sellables/course/${course.id}/subscribe_pre_request`,
                {},
                config
            );
            const { previous_invoices: previousInvoices } = result;

            if (previousInvoices.length > 0) {
                setInvoices(previousInvoices);
            } else {
                navigate("../invoice", { replace: true });
            }
        } catch (error) {}
    };
    useEffect(() => {
        !isObjectEmpty(course) && getPreviousInvoices();

        if (!isObjectEmpty(course)) {
            if (course.subscriptions_count > 0) {
                navigate(`/course/${course.id}`);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course, course.subscriptions_count]);

    return (
        <>
            {invoices.length < 1 ? (
                placeholder
            ) : (
                <Container>
                    <div className="relative z-10 bg-inner-container smooth clr-text-primary rounded-lg shadow-large p-10 -mt-52">
                        <div className="absolute">
                            <Link
                                element="Link"
                                className="underline clr-text-secondary smooth"
                                to={-1}
                            >
                                <FlexRowReverse>
                                    <CenterIcon icon="akar-icons:arrow-right" />
                                    <span>العودة للوراء</span>
                                </FlexRowReverse>
                            </Link>
                        </div>
                        <div className="font-w-bold font-h1 pb-10 flex-center-both">
                            <div>الفواتير السابقة</div>
                        </div>
                        <div className="font-h3  justify-start pb-10">
                            <div>يوجد لديك بالفعل فواتير سابقة</div>
                        </div>
                        <div>
                            <table className="table-auto w-full table-style">
                                <thead className="py-10">
                                    <tr>
                                        <th className="h-20 text-center">السريال</th>
                                        <th className="h-20 text-center">تاريخ الفاتورة</th>
                                        <th className="h-20 text-center">وقت دفع الفاتورة</th>
                                        <th className="h-20 text-center">
                                            سعر
                                            {/* <br /> */}
                                            الفاتورة
                                        </th>
                                        <th className="h-20 text-center">
                                            سعر
                                            {/* <br /> */}
                                            الكورس
                                        </th>
                                        <th className="h-20 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody className="py-10">
                                    {invoices.map((invoice) => {
                                        return (
                                            <tr key={invoice.id}>
                                                <td className="h-20 text-center">{invoice.id}</td>
                                                <td className="h-20 text-center">
                                                    {printFullDateTime(invoice.created_at)}
                                                </td>
                                                <td className="h-20 text-center">
                                                    {invoice.payment_time
                                                        ? printFullDateTime(invoice.payment_time)
                                                        : ""}
                                                </td>
                                                <td className="h-20 text-center">
                                                    {invoice.total_price}
                                                </td>
                                                <td className="h-20 text-center">
                                                    {invoice.invoice_subscriptions[0].price}
                                                </td>

                                                <td className="h-20 text-center">
                                                    <a href={payment.getInvoiceUrl(invoice)}>
                                                        <Button color="blue">دفع الفاتورة</Button>
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-start space-x-5 space-x-reverse items-center pt-10">
                            <div className="text-teal-500 font-w-bold">أو :</div>
                            <Button element="Link" to="../invoice">
                                انشاء فاتورة جديدة !
                            </Button>
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
};

export default SubscriptionPreviousInvoices;
