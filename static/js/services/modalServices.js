import swal from "sweetalert";

export const message = ({
    title = "",
    text = "",
    icon = "success",
    button = "حسنًا",
    buttons = false,
    callback = () => null,
}) => {
    let options = {
        title,
        text,
        icon,
        callback,
    };

    if (buttons) {
        options = { ...options, buttons };
    } else {
        options = { ...options, button };
    }

    swal(options).then((accept) => {
        callback(accept);
    });
};
export const modal = {
    message,
};

export default modal;
