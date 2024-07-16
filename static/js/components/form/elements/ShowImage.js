import { useRef, useState } from "react";
import { showPicture } from "../../../services/contentServices";
import Button from "../../ui/Button";
import { useEffect } from "react";
import { baseURL } from "../../../config";

const ShowImage = ({ file, path = "", isPath = false }) => {
    const imageSrcRef = useRef();
    let init = { size: 0, width: 0, height: 0 };
    const [imageInfo, setImageInfo] = useState(init);

    const [isValidImage, setisValidImage] = useState(false);

    let count = 0;
    const getFileFromPath = () => {
        count++;
        setisValidImage(true);
        if (imageSrcRef.current) {
            imageSrcRef.current.src = `${baseURL}/${path}`;
            let size = false;

            setTimeout(() => {
                let width = imageSrcRef.current.naturalWidth;
                let height = imageSrcRef.current.naturalHeight;
                setImageInfo({ size, width, height });
            }, 100);
        } else {
            // if (count < 10) {
            //     setTimeout(() => {
            //         getFileFromPath();
            //     }, 100);
            // }
        }
    };

    useEffect(() => {
        if (isPath) {
            getFileFromPath(path);
        } else if (file && typeof file !== "string") {
            getImageData(file);
        }
    }, [file, path, isPath]);

    const getImageData = (fileImage) => {
        setisValidImage(true);
        var reader = new FileReader();
        reader.onload = function (e) {
            imageSrcRef.current.src = e.target.result;
            let size = fileImage.size;
            setTimeout(() => {
                let width = imageSrcRef.current.naturalWidth;
                let height = imageSrcRef.current.naturalHeight;
                setImageInfo({ size, width, height });
            }, 100);
        };
        reader.readAsDataURL(fileImage);
    };

    return (
        <>
            <div
                className={`w-full flex flex-col justify-center space-y-2 pt-4 ${
                    !isValidImage ? "hidden" : ""
                }`}
            >
                <img
                    alt="pic"
                    ref={imageSrcRef}
                    className="h-60 m-auto cursor-pointer rounded-md"
                    onClick={() => showPicture(imageSrcRef.current.src, false)}
                />

                <div className="flex-col flex-center-both w-full space-y-4">
                    <div className="flex-center-both w-full">
                        <Button
                            color="blue"
                            onClick={(e) => {
                                e.preventDefault();
                                showPicture(imageSrcRef.current.src, false);
                            }}
                            className=""
                        >
                            عرض الصورة
                        </Button>
                    </div>
                    <div className="space-y-1 flex flex-col justify-center text-black dark:text-white">
                        <span className="size m-auto">
                            {" "}
                            {imageInfo.width}&#120;
                            {imageInfo.height}
                        </span>
                        {imageInfo.size ? (
                            <span className="size m-auto">
                                <>{Math.round(imageInfo.size / 1024)}KB </>
                            </span>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default ShowImage;
