import SeeMoreDescription from "../components/ui/SeeMoreDescription";
import moment from "moment";
import "moment/locale/ar";
moment.locale("ar");

// dayjs.extend(relativeTime);
// dayjs.locale("ar");

export const a2e = (value) => value.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
export const description = (value, isSeeMore = false, lastRowElement = "") =>
    value &&
    (isSeeMore ? (
        <SeeMoreDescription value={value} />
    ) : (
        value.split(/(?:\r\n|\r|\n)/g).map((line, i) => (
            <span key={i}>
                {line}
                {i === value.split(/(?:\r\n|\r|\n)/g).length - 1 ? lastRowElement : ""}
                <br />
            </span>
        ))
    ));

export const getUnit = (
    value,
    plural = "",
    sinuglar = "",
    two = "",
    isFeminine = false,
    returnOriginalValue = false
) => {
    const oneUnit = sinuglar + (isFeminine ? " واحدة" : " واحد");
    const parsedValue = parseInt(value);
    const returnValue = returnOriginalValue ? value : parsedValue;
    if (parsedValue === 0) {
        return { value: 0, label: sinuglar };
    } else if (parsedValue === 1) {
        return { value: "", label: oneUnit };
    } else if (parsedValue === 2) {
        return { value: "", label: two };
    } else if (parsedValue < 11) {
        return { value: returnValue, label: plural };
    } else {
        return { value: returnValue, label: sinuglar };
    }
};

export const printGovernment = (governments, government_id) => {
    if (governments.length > 1) {
        let government = governments.find((government) => {
            return government.value == government_id;
        });
        if (!government) {
            return "لم يتم العثور على المحافظة";
        }
        return government.text;
    } else {
        return "يتم تحميل المحافظات";
    }
};

export const printIdOfOptions = (
    options,
    id,
    loadingText = "يتم الآن التحميل",
    notFoundText = "لم يتم العثور على نتيجة"
) => {
    if (options.length > 1) {
        let option = options.find((value) => {
            return value.value == id;
        });
        if (!option) {
            return notFoundText;
        }
        return option.text;
    } else {
        return loadingText;
    }
};

export const printUnit = (
    value,
    plural = "",
    sinuglar = "",
    two = "",
    isFeminine = false,
    returnOriginalValue = false
) => {
    if (plural === "دقيقة") {
        sinuglar = "دقيقة";
        two = "دقيقتان";
        plural = "دقائق";
        isFeminine = true;
    } else if (plural === "ثانية") {
        sinuglar = "ثانية";
        two = "ثانيتان";
        plural = "ثواني";
        isFeminine = true;
    } else if (plural === "مرة") {
        sinuglar = "مرة";
        two = "مرتان";
        plural = "مرات";
        isFeminine = true;
    } else if (plural === "سؤال") {
        sinuglar = "سؤال";
        two = "سؤالان";
        plural = "اسئلة";
        isFeminine = false;
    } else if (plural === "ساعة") {
        sinuglar = "ساعة";
        two = "ساعاتان";
        plural = "ساعات";
        isFeminine = true;
    } else if (plural === "فيديو") {
        sinuglar = "فيديو";
        two = "فيديوهان";
        plural = "فيديوهات";
        isFeminine = false;
    } else if (plural === "امتحان") {
        sinuglar = "امتحان";
        two = "امتحانان";
        plural = "امتحانات";
        isFeminine = false;
    } else if (plural === "محاضرة") {
        sinuglar = "محاضرة";
        two = "محاضرتان";
        plural = "محاضرات";
        isFeminine = true;
    } else if (plural === "مشاهدة") {
        sinuglar = "مشاهدة";
        two = "مشاهدتان";
        plural = "مشاهدات";
        isFeminine = true;
    } else if (plural === "كورس") {
        sinuglar = "كورس";
        two = "كورسان";
        plural = "كورسات";
        isFeminine = false;
    } else if (plural === "مدرس") {
        sinuglar = "مدرس";
        two = "مدرسان";
        plural = "مدرسين";
        isFeminine = false;
    } else if (plural === "جنيه") {
        sinuglar = "جنيه";
        two = "جنيهان";
        plural = "جنيهات";
        isFeminine = false;
    } else if (plural === "مادة") {
        sinuglar = "مادة";
        two = "مادتان";
        plural = "مواد";
        isFeminine = true;
    } else if (plural === "طالب") {
        sinuglar = "طالب";
        two = "طالبان";
        plural = "طلبة";
        isFeminine = false;
    } else if (plural === "موضوع") {
        sinuglar = "موضوع";
        two = "موضوعان";
        plural = "مواضيع";
        isFeminine = false;
    } else if (plural === "تعليق") {
        sinuglar = "تعليق";
        two = "تعليقان";
        plural = "تعليقات";
        isFeminine = false;
    } else if (plural === "جهاز") {
        sinuglar = "جهاز";
        two = "جهازان";
        plural = "أجهزة";
        isFeminine = false;
    }
    return (
        getUnit(parseInt(value), plural, sinuglar, two, isFeminine)["value"] +
        " " +
        getUnit(parseInt(value), plural, sinuglar, two, isFeminine)["label"]
    );
};

export const printRelativeDate = (date) => {
    return moment(date).fromNow();
    // return dayjs().to(dayjs(date));
};
