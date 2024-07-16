import { dateOptions } from "../config";

export const printFullDate = (date) => {
    return new Date(date).toLocaleDateString("ar-EG", dateOptions);
};
export const printFullDateTime = (date) => {
    const dateObject = new Date(date);
    return `${padstart2(dateObject.getHours())}:${padstart2(
        dateObject.getMinutes()
    )} ${dateObject.toLocaleDateString("ar-EG", dateOptions)}`;
};

export const padstart2 = (value) => {
    return `${value}`.padStart("2", "0");
};
export const printDateTime = (datetime = Date.now()) => {
    const date = new Date(datetime);
    return `${date.getFullYear()}-${padstart2(date.getMonth() + 1)}-${padstart2(
        date.getDate()
    )}T${padstart2(date.getHours())}:${padstart2(date.getMinutes())}`;
};

export function getDatesInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dates;
  }
