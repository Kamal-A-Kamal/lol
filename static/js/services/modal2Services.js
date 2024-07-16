import Swal from "sweetalert2";

export const message = ({
    title = "",
    text = "",
    icon = "success",
    button = "حسنًا",
    buttons = false,
    input = undefined,
    inputLabel = "",
    callback = () => null,
    ...props
}) => {
    let options = {
        title,
        text,
        icon,
        callback,
        input,
        inputLabel,
        ...props,
    };

    if (buttons) {
        options = { ...options, buttons };
    } else {
        options = { ...options, button };
    }

    Swal.fire(options).then((accept) => {
        callback(accept);
    });
};
export const modal2 = {
    message,
};

export default modal2;
