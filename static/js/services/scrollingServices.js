export const windowHeight = window.innerHeight;
export const getDocumentHeight = (minusViewPort = false) => {
    if (minusViewPort) {
        return document.documentElement.offsetHeight - windowHeight;
    } else {
        return document.documentElement.offsetHeight;
    }
};
export const getCurrentScrollingPosition = (plusViewPort = false) => {
    if (plusViewPort) {
        return window.scrollY + windowHeight;
    } else {
        return window.scrollY;
    }
};
export const getCurrentScrollingPercentage = (scrolling) => {
    return scrolling / getDocumentHeight(true);
};

export const toggleScrolledClass = (scrolling) => {
    if (scrolling < 1) {
        document.body.classList.remove("scrolled");
    } else {
        document.body.classList.add("scrolled");
    }
};

function getPercentageStatus(percentage) {
    let result = {};
    if (percentage > 1) {
        result.percentage = 1;
        result.status = "after";
    } else if (percentage < 0) {
        result.percentage = 0;
        result.status = "before";
    } else {
        result.percentage = percentage;
        result.status = "passing";
    }
    return result;
}
export const easeOutSine = (x) => {
    return Math.sin((x * Math.PI) / 2);
};
export const easeOutCubic = (x) => {
    return 1 - Math.pow(1 - x, 3);
};
export const getPartialPercentage = (percentage, start = 0, end = 1) => {
    // const sum = start + end;
    // const past = sum ? 1 / sum : 1;

    const result = (percentage - start) / (end - start);
    if (result >= 1) {
        return 1;
    } else if (result <= 0) {
        return 0;
    } else {
        return result;
    }
};
export const easeInCubic = (x) => {
    return x * x * x;
};

export function getScrollingPercentage(
    windowTop,
    offsetTop,
    height,
    sConstant = 0,
    eConstant = 0,
    isNegative = false
) {
    const scrollingTop = windowTop + windowHeight;

    const animationStartPoint = offsetTop + sConstant;

    const animationEndPoint = height + eConstant - sConstant;
    const scrollingOnElement = scrollingTop - animationStartPoint;

    const percentage = scrollingOnElement / animationEndPoint;

    return getPercentageStatus(percentage);
}

const scroll = {
    getDocumentHeight,
    getCurrentScrollingPosition,
    getCurrentScrollingPercentage,
    toggleScrolledClass,
    getScrollingPercentage,
    windowHeight,
    easeOutSine,
    getPartialPercentage,
    easeInCubic,
};
export default scroll;
