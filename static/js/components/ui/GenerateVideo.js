import React, { useContext, useEffect, useRef, useState } from "react";

import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { videoSource } from "../../services/contentServices";
// import { config } from "../../config";
// import CourseContext from "../../context/CourseContext";
// import { isObjectEmpty } from "../../utils/objects";
import auth from "../../services/authServices";
import http from "../../services/httpServices";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const GenerateVideo = ({ course, video }) => {
    const [videoViewIdCallSent, setVideoViewIdCallSent] = useState(false);
    const [videoViewId, setVideoViewId] = useState(0);

    // const [isInkLoading, setIsInkLoading] = useState(true);

    // const { setIsRefresh } = useContext(CourseContext);
    const { id, section_id, video_id } = useParams();

    const plyrContainer = useRef(null);
    const plyrRef = useRef(null);
    const inkdev = useRef(null);

    let element = <></>;

    if (video.platform === "upload") {
        let plyrProps = {
            // https://github.com/sampotts/plyr#the-source-setter
            options: {
                controls: [
                    "play-large",
                    "play",
                    "progress",
                    "current-time",
                    "mute",
                    "volume",
                    "settings",
                    "airplay",
                    "fullscreen",
                ],
                settings: ["quality", "speed", "loop"],
                seekTime: 7,
                quality: {
                    default: 720,
                    options: [1080, 720, 480, 240],
                },
            }, // https://github.com/sampotts/plyr#options
            // Direct props for inner video tag (mdn.io/video)
        };
        let source = {
            type: "video",
            title: video.name,
            sources: [
                {
                    src: videoSource(video.source),
                    type: "video/mp4",
                    size: 1080,
                },
            ],
        };
        if (video["720p"]) {
            source = {
                ...source,
                sources: [
                    {
                        src: videoSource(video.source),
                        type: "video/mp4",
                        size: 1080,
                    },
                    {
                        src: videoSource(video["720p"]),
                        type: "video/mp4",
                        size: 720,
                    },
                    {
                        src: videoSource(video["480p"]),
                        type: "video/mp4",
                        size: 480,
                    },
                    {
                        src: videoSource(video["240p"]),
                        type: "video/mp4",
                        size: 240,
                    },
                ],
            };
        }
        plyrProps = {
            ...plyrProps,
            source,
        };
        const seek = (e) => {
            const rect = plyrContainer.current.getBoundingClientRect();
            const mouseOnDiv = e.clientX - rect.x;
            if (mouseOnDiv >= rect.width / 2) {
                plyrRef.current.plyr.forward();
            } else {
                plyrRef.current.plyr.rewind();
            }
        };
        element = (
            <div onDoubleClick={(e) => seek(e)} ref={plyrContainer}>
                <Plyr {...plyrProps} ref={plyrRef} />
            </div>
        );
    } else if (video.platform === "youtube") {
        element = (
            <iframe
                title="youtube"
                width="100%"
                style={{
                    minHeight: "80vh",
                }}
                allow="fullscreen;"
                src={`https://www.youtube.com/embed/${video.source}?autoplay=1`}
            ></iframe>
        );
    } else if (video.platform === "vimeo") {
        element = (
            <iframe
                title="vimeo"
                src={`https://player.vimeo.com/video/${video.source}`}
                width="100%"
                style={{
                    minHeight: "80vh",
                }}
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen
            ></iframe>
        );
    } else if (video.platform === "bunny") {
        element = (
            <iframe
                title="Bunny"
                src={`${video.source}`}
                width="100%"
                style={{
                    minHeight: "80vh",
                }}
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen
            ></iframe>
        );
    } else if (video.platform === "killer_player") {
        element = (
            <iframe
                title="KllerPLayer"
                width="100%"
                style={{
                    minHeight: "80vh",
                }}
                src={`${video.source}`}
                allow="fullscreen;"
                allowfullscreen
            ></iframe>
        );
    }

    let videoViewStaticId = false;
    const startVideoLimit = async () => {
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        if (!videoViewIdCallSent && section_id) {
            setVideoViewIdCallSent(true);
            const { data: result } = await http.post(
                // `/api/course/${id}/sections/${section_id}/sectionables/${video_id}/videos/${video.id}/video_views`,
                `/api/sellables/course/${id}/sections/${section_id}/sectionables/${video_id}/videos/${video.id}/video_views`,
                {},
                config
            );
            videoViewStaticId = result.id;
            setVideoViewId(result.id);
        }
    };
    const saveVideoLimit = async (duration_opened, duration_played, current_time) => {
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        if (videoViewStaticId) {
            // eslint-disable-next-line no-unused-vars
            try {
                const { data: result } = await http.post(
                    // `/api/video_views/${videoViewStaticId}`,
                    `/api/sellables/course/${id}/sections/${section_id}/sectionables/${video_id}/videos/${video.id}/video_views/${videoViewStaticId}`,
                    { duration_opened, duration_played, current_time },
                    config
                );
            } catch (error) {}
        }
    };

    useEffect(() => {
        startVideoLimit();
        if (video.platform === "upload") {
            let durationOpened = 0;
            let durationPlayed = 0;
            let currentTime = 0;
            const timeIntervals = setInterval(() => {
                durationOpened++;
                currentTime = plyrRef.current.plyr.currentTime;
                if (plyrRef.current.plyr.playing) {
                    durationPlayed++;
                }
            }, 1000);
            const saveIntervals = setInterval(() => {
                saveVideoLimit(durationOpened, durationPlayed, currentTime);
            }, 20000);
            return () => {
                clearInterval(timeIntervals);
                clearInterval(saveIntervals);
            };
        } else if (video.platform === "ink") {
            toast("يتم الآن تحميل الفيديو يرجى الانتظار قليلًا..");

            (function (i, n, k, r, y, p, t) {
                i[p] = i[p] || {};
                i[p].add =
                    i[p].add ||
                    function I(j) {
                        (i[p].a = i[p].a || []).push(j);
                    };
                if (!i[p].d) {
                    i[p].d = 1 * new Date();
                    i[p].t = y;
                    const a = n.createElement(k);
                    const m = n.getElementsByTagName(k)[0];
                    a.async = 1;
                    a.src = r;
                    i[p].y = t;
                    m.parentNode.insertBefore(a, m);
                }
            })(
                window,
                document,
                "script",
                "https://resource.inkryptvideos.com/v2-a83ns52/ink.js",
                true,
                "inkrypt",
                "2.x"
            );
            window.inkrypt.add({
                video_id: video.source,
                otp: video.otp.otp,
                api: "api",
                license: "license",
                config: JSON.stringify(video.otp.configuration),
                container: inkdev.current,
            });
            let durationOpened = 0;
            let durationPlayed = 0;
            let currentTime = 0;
            // let player = window.inkrypt.getObjects()[0];
            const timeIntervals = setInterval(() => {
                durationOpened++;
                if (window.inkrypt && typeof window.inkrypt.getObjects === "function") {
                    durationPlayed = window.inkrypt.getObjects()[0].getTotalPlayedTime();
                    // console.log("duration played", durationPlayed);
                    currentTime = window.inkrypt.getObjects()[0].getCurrentTime();
                    // console.log("current time", currentTime);
                    // let player = window.inkrypt.getObjects()[0];
                    // console.log(player);
                    // console.log(player.getCurrentTime());
                    //// ## get is video playing  ## ///
                    // if (true) {
                    // durationPlayed++;
                }
                // }
            }, 1000);
            const saveIntervals = setInterval(() => {
                saveVideoLimit(durationOpened, durationPlayed, currentTime);
            }, 20000);
            return () => {
                clearInterval(timeIntervals);
                clearInterval(saveIntervals);
                // delete window.inkrypt;
                // document.body.removeChild(script);
            };
        } else if (video.platform === "vdocipher") {
            const vdoci = (v, i, d, e, o) => {
                v[o] = v[o] || {};
                v[o].add =
                    v[o].add ||
                    function V(a) {
                        (v[o].d = v[o].d || []).push(a);
                    };
                if (!v[o].l) {
                    v[o].l = 1 * new Date();
                    let a = i.createElement(d);
                    let m = i.getElementsByTagName(d)[0];
                    a.async = 1;
                    a.src = e;
                    m.parentNode.insertBefore(a, m);
                }
            };
            const script = vdoci(
                window,
                document,
                "script",
                "https://player.vdocipher.com/playerAssets/1.6.10/vdo.js",
                "vdo"
            );
            window.vdo.add({
                otp: video.otp.otp,
                playbackInfo: video.otp.playbackInfo,
                theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
                container: inkdev.current,
            });
            let durationOpened = 0;
            let durationPlayed = 0;
            let currentTime = 0;
            const timeIntervals = setInterval(() => {
                durationOpened++;
                durationPlayed = window.vdo._list[0].totalPlayed;
                currentTime = window.vdo._list[0].currentTime;
            }, 1000);
            const saveIntervals = setInterval(() => {
                saveVideoLimit(durationOpened, durationPlayed, currentTime);
            }, 20000);
            return () => {
                clearInterval(timeIntervals);
                clearInterval(saveIntervals);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (video.platform === "ink") {
        element = <div ref={inkdev}></div>;
    } else if (video.platform === "vdocipher") {
        element = <div ref={inkdev}></div>;
    }

    return element;
};

export default GenerateVideo;
