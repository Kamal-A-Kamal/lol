import React from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import { description } from "../../utils/ar";
import { isObjectEmpty } from "../../utils/objects";

const SubscriptionResult = ({
    result,
    successfulPlaceholder = `كورسات تم\nتفعيلها`,
    duplicatedPlaceholder = `كورسات مشترك\nبها بالفعل`,
}) => {
    // console.log(result);
    return (
        <AdminContainer customTitle="نتيجة العملية">
            {(!result["users"] || isObjectEmpty(result["users"])) && (
                <>
                    <>
                        <div className="bg-rose-400 rounded-md clr-white px-4 py-2">
                            كل الأرقام المدخلة لم يتم العثور عليها!
                        </div>
                        <div className="h-0.5 bg-secondary-container smooth w-full"></div>
                    </>
                </>
            )}
            {result["not_found_users"] && !isObjectEmpty(result["not_found_users"]) ? (
                <>
                    <div className="w-full justify-start font-h2">
                        لم يتم العثور علي هذه الأرقام :
                    </div>
                    <table className="table-auto w-full table-style">
                        <thead className="">
                            <tr>
                                <th className="h-12 text-center"></th>
                                <th className="h-12 text-center">رقم التليفون</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {Object.keys(result["not_found_users"]).map((index) => {
                                return (
                                    <tr key={index}>
                                        <td className="h-12 text-center">{parseInt(index) + 1}</td>
                                        <td className="h-12 text-center">
                                            {result["not_found_users"][index]}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="h-0.5 bg-secondary-container smooth w-full"></div>
                </>
            ) : (
                <>
                    <div className="bg-blue-400 rounded-md clr-white px-4 py-2">
                        تم العثور علي كل الأرقام المدخلة!
                    </div>
                    <div className="h-0.5 bg-secondary-container smooth w-full"></div>
                </>
            )}

            {result["users"] && !isObjectEmpty(result["users"]) ? (
                <>
                    <div className="w-full justify-start font-h2">نتائج الأرقام المدخلة</div>
                    <table className="table-auto w-full table-style">
                        <thead className="">
                            <tr>
                                <th className="h-12 text-center"></th>
                                <th className="h-12 text-center">رقم التليفون</th>
                                <th className="h-12 text-center">الاسم</th>
                                <th className="h-12 text-center">
                                    {description(successfulPlaceholder)}
                                </th>
                                <th className="h-12 text-center">
                                    {description(duplicatedPlaceholder)}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {Object.keys(result["users"]).map((index) => (
                                <tr key={index}>
                                    <td className="h-12 text-center">{parseInt(index) + 1}</td>
                                    <td className="h-12 text-center">
                                        {result["users"][index]["phone"]}
                                    </td>
                                    <td className="h-12 text-center">
                                        {result["users"][index]["name"]}
                                    </td>
                                    <td className="h-12 text-center">
                                        <div className="flex-center-both flex-col space-y-1">
                                            {result["users"][index]["successful"]
                                                ? Object.keys(
                                                      result["users"][index]["successful"]
                                                  ).map((course_id) => (
                                                      <span
                                                          key={course_id}
                                                          className="rounded-md font-small bg-teal-500 clr-white px-2 py-1"
                                                      >
                                                          {
                                                              result["users"][index]["successful"][
                                                                  course_id
                                                              ]
                                                          }
                                                      </span>
                                                  ))
                                                : "---"}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex-center-both flex-col space-y-1">
                                            {result["users"][index]["duplicated"]
                                                ? Object.keys(
                                                      result["users"][index]["duplicated"]
                                                  ).map((course_id) => (
                                                      <span
                                                          key={course_id}
                                                          className="rounded-md font-small bg-yellow-500 clr-white px-2 py-1"
                                                      >
                                                          {
                                                              result["users"][index]["duplicated"][
                                                                  course_id
                                                              ]
                                                          }
                                                      </span>
                                                  ))
                                                : "---"}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="h-0.5 bg-secondary-container smooth w-full"></div>
                </>
            ) : (
                ""
            )}
        </AdminContainer>
    );
};

export default SubscriptionResult;
