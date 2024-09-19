import { getCookie } from "cookies-next";
import parse from "html-react-parser";
import FormData from "form-data";
// import moment from "moment";
import http from "./http";
import toast from "react-hot-toast";
import axios from "axios";
import moment from 'moment-timezone';

// import FormData from "form-data";
// import variables from "styles/globals.module.scss";
export function format_date(date) {
  // Set the default timezone
  moment.tz.setDefault("Australia/Sydney");

  // Parse the date with the specified input format
  const parsedDate = moment(date, 'DD/MM/YYYY');

  // Format the date to the desired output format
  return parsedDate.format("MMMM D, YYYY");
}
export const convertToAEST = (date) => {

  // Convert date to AEST
  const dateInAEST = moment(date).tz('Australia/Sydney');

  // Format date in standard Australian format (DD/MM/YYYY HH:mm)
  const formattedDate = dateInAEST.format('DD/MM/YYYY');

  return formattedDate;
};
export const getUserTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
export const formatTimeFromSeconds = (seconds, userTimezone) => {
  // Convert seconds to milliseconds and create a moment instance
  const date = moment.unix(seconds);

  // Convert to the user's timezone and format
  return date.tz(userTimezone).format('MMMM D, YYYY [at] h:mm A');
};
export function generateUniqueNumber() {
  const timestamp = Date.now(); // Get the current timestamp
  const randomNumber = Math.floor(Math.random() * 1e10); // Generate a random number with 10 digits
  const uniqueNumber = `${timestamp}${randomNumber}`; // Combine timestamp and random number

  return parseInt(uniqueNumber, 10); // Return as a long number
}
export const convertTimeInSecondsToDateTime = (timeInSeconds) => {
  // // Get user's timezone
  // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // // Convert time in seconds to milliseconds and create a Date object
  // const date = new Date(timeInSeconds * 1000);

  // // Format the date and time in the user's timezone
  // const formatter = new Intl.DateTimeFormat('en-US', {
  //   timeZone,
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   second: 'numeric',
  //   hour12: true
  // });

  // return formatter.format(date);
  const userTimezone = getUserTimezone();
  return formatTimeFromSeconds(timeInSeconds, userTimezone);
};
export const convertToAESTDashes = (date) => {

  return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
};
export const convertTDateReview = (date) => {

  return moment(date).format('MMMM DD, YYYY');
};
export const calculateDaysBetween = (startDate, endDate) => {
  // Specify the date format
  const format = 'DD/MM/YYYY';

  // Parse the dates using moment with the specified format
  const start = moment.tz(startDate, format, 'Australia/Sydney');
  const end = moment.tz(endDate, format, 'Australia/Sydney');

  // Calculate the difference in days
  const differenceInDays = end.diff(start, 'days');
  return differenceInDays + 1;
};
let allow_console = true;
export function consoleLog(item) {
  if (allow_console) {
    console.log(item)
  }
}
export function haversineDistance(coords1, coords2) {
  const toRad = (x) => x * Math.PI / 180;

  const lat1 = coords1?.latitude;
  const lon1 = coords1?.longitude;
  const lat2 = coords2?.latitude;
  const lon2 = coords2?.longitude;
  if (lat1 && lat2 && lon1 && lon2) {
    const R = 6371; // Radius of the Earth in km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in km
    return distance;
  }
  return false;

};
export function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
export function replaceSpaceWith20(string) {
  string = string.replaceAll("_", " ");
  string = string.replaceAll(",", " ");
  string = string.replaceAll("#", " ");
  return string.replace(/ /g, "%20");
}
export async function ImageUpload(event, type = 'listings', file_type = "image") {
  const fd = new FormData();
  fd.append("image", event);
  fd.append("type", type);
  fd.append("file_type", file_type);
  return axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}api/upload-image`, fd).then((res) => {
    return res.data;
  });
}
export function isImage(fileName) {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
  const ext = fileName?.split('.').pop().toLowerCase();
  return imageExtensions.includes(ext);
}
export const getFirstWord = (str) => {
  if (!str) return '';
  return str.split(' ')[0];
};
export async function uploadMultipleImages(event, type, file_type = "image") {
  let newImages = [];
  let images_arr = event.target.files;
  for (let i = 0; i < images_arr.length; i++) {
    let fileSize = images_arr[i].size;
    let sizeMb = bytesToMegaBytes(fileSize);
    if (sizeMb < 40) {
      let image = await ImageUpload(images_arr[i], type, file_type).then((data) => {
        if (data.image_name != undefined) {
          newImages.push({ file_name: data.image_name, name: data?.file_name });
        }
      });
    }
  }
  return newImages;


}
export function fileValidation(files) {
  let res = [];
  let fileSize = files.size;
  let sizeMb = bytesToMegaBytes(fileSize);
  if (sizeMb > 50) {
    res['error'] = 'The File size is too big. Allowed size is 50MB.';
    return res;
  }
  return res;
}
export function imageValidation(files) {
  let res = [];
  let fileSize = files.size;
  let image_type = split_string(files.type, '/');
  if (image_type[0] === 'image') {
    if (image_type[1] === "webp") {
      res['error'] = 'Only images(jpg,jpeg,png,svg,gif) are allowed to upload. The file type you are trying to upload is not allowed.';
      return res;
    }
    else {
      let sizeMb = bytesToMegaBytes(fileSize);
      if (sizeMb > 50) {
        res['error'] = 'The Image size is too big. Allowed size is 50MB.';
        return res;
      }
    }

  }
  else if (image_type[1] === "webp") {
    res['error'] = 'Only images(jpg,jpeg,png,svg,gif) are allowed to upload. The file type you are trying to upload is not allowed.';
    return res;
  }
  else {
    res['error'] = 'Only images(jpg,jpeg,png,svg,gif) are allowed to upload. The file type you are trying to upload is not allowed.';
    return res;
  }
  return res;
}
export function doObjToFormData(obj) {
  let formData = new FormData();
  for (var key in obj) {
    if (Array.isArray(obj[key])) {
      for (let [keyv, value] of Object.entries(obj[key])) {
        formData.append(key + "[]", JSON.stringify(value));
      }
    } else {
      if (typeof obj[key] == "object") {
        formData.append(key, JSON.stringify(obj[key]));
      } else {
        if (obj[key] !== null && obj[key] !== undefined) {
          formData.append(key, obj[key]);

        }
      }
    }
  }
  return formData;
}

export function doObjToFormDataWithBlob(obj) {
  let formData = new FormData();
  for (var key in obj) {
    if (Array.isArray(obj[key])) {
      for (let [keyv, value] of Object.entries(obj[key])) {
        formData.append(key + "[]", JSON.stringify(value));
      }
    } else {
      if (typeof obj[key] == "object") {
        if (key === "video") {
          formData.append(key, obj[key], "Interview-Video.mp4");
        } else {
          formData.append(key, JSON.stringify(obj[key]));
        }



      } else {
        formData.append(key, obj[key]);
      }
    }
  }
  return formData;
}


export function doObjToFormDataWithoutString(obj) {
  var formData = new FormData();
  for (var key in obj) {
    if (Array.isArray(obj[key])) {
      for (let [keyv, value] of Object.entries(obj[key])) {
        formData.append(key + "[]", value);
      }
    } else {
      if (typeof obj[key] == "object") {
        formData.append(key, obj[key]);
      } else {
        formData.append(key, obj[key]);
      }
    }
  }
  return formData;
}

export function doFirstUpperRestLower(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}
export function new_moment_date() {
  moment.tz.setDefault("Australia/Sydney");
  return moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
}
export function convertNodeDateToDateFormat(date) {
  moment.tz.setDefault("Australia/Sydney");
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}
export function doParseHTML(string) {
  return parse(string);
}

export function eventDateFormat(date) {
  return moment(date).format("DD, MMMM YYYY");
}
export function getMonthDayDate(dateString) {
  return moment(dateString).format("MMM D");;
}

export function eventTimeFormat(time) {
  return moment(time, "HHmm").format("hh:mm A");
}

export function eventTimeFormatNew(time) {
  return moment(time, "HHmm").format("hh A");
}

export function onlyDayThreeletters(date) {
  return moment(date).format("ddd");
}

export function onlyDateTwoletters(date) {
  return moment(date).format("DD");
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function nowPlus6Days() {
  let days = [];
  let daysRequired = 7;

  for (let i = 0; i <= daysRequired; i++) {
    days.push(moment().add(i, "days").format("YYYY-MM-DD"));
  }
  return days;
}
export const generateContentArray = (data, start, end, sec_start_index, sec_label = '', link = false, link_label = null) => {
  const contentArray = [];

  for (let i = start; i <= end; i++) {
    const imageKey = `image${i}`;
    if (sec_label !== '') {
      if (sec_label === '_card') {
        let linkKey = ''
        let link_text = ''
        let link_url = ''
        const headingKey = `sec${sec_start_index}${sec_label}_title${i}`;
        const textKey = `sec${sec_start_index}${sec_label}_text${i}`;
        if (link) {
          if (link_label) {
            link_text = `sec${sec_start_index}${sec_label}_link_text${i}`;
            link_url = `sec${sec_start_index}${sec_label}_link_url${i}`;
          }
          else {
            linkKey = `sec${sec_start_index}${sec_label}_link${i}`;
          }

        }
        contentArray.push({
          image: data[imageKey],
          heading: data[headingKey],
          text: data[textKey],
          link: data[linkKey],
          link_text: data[link_text],
          link_url: data[link_url],
        });
      }
      else {
        const textKey = `${sec_label}${i}`;
        if (data[imageKey] && data[textKey]) {
          contentArray.push({
            image: data[imageKey],
            text: data[textKey],
          });
        }
      }

    }
    else {
      const headingKey = `sec${sec_start_index}_heading${i}`;
      const textKey = `sec${sec_start_index}_text${i}`;

      if (data[imageKey] && data[textKey]) {
        let link_text = ''
        let link_url = ''
        if (link) {
          link_text = `sec${sec_start_index}_link_text${i}`;
          link_url = `sec${sec_start_index}_link_url${i}`;
        }
        contentArray.push({
          image: data[imageKey],
          heading: data[headingKey],
          text: data[textKey],
          link_text: data[link_text],
          link_url: data[link_url],
        });
      }
    }

  }

  return contentArray;
};

export function split_string(str, symbol) {
  var ar = str.split(symbol);
  return ar;
}

export function cmsFileUrl(src, folder = "images", stock = false) {
  if (src === null || src === undefined || src === '') {
    if (stock === true) {
      return '/images/stock-profile.jpg';
    }
    else {
      return '/images/no-image.svg';
    }

  }
  else {
    return `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}uploads/${folder}/${src}`;
  }
}

export function timeAgo(date) {
  const momentDate = moment(date);
  const diff = moment().diff(momentDate);

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (diff < minute) {
    return "Just now";
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diff < month) {
    const days = Math.floor(diff / day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (diff < year) {
    const months = Math.floor(diff / month);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diff / year);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}

// export function format_amount(amount, size = 2) {
//   amount = parseFloat(amount);
//   return amount >= 0
//     ? `$${numberFormat(amount, size)}`
//     : `$(${numberFormat(Math.abs(amount), size)})`;
// }
export function numberFormatAmount(amount, size) {
  const parts = amount.toFixed(size).split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] || '';

  if (parseFloat(decimalPart) === 0) {
    return integerPart;
  }

  return parseFloat(amount).toFixed(size).replace(/\.?0+$/, '');
}
export function roundToNearestTenCents(value) {
  return (Math.round(value * 10) / 10).toFixed(2);
}
export function hasDecimal(value) {
  return value % 1 !== 0;
}
export function format_amount(amount, size = 2) {
  amount = Math.round(parseFloat(amount) * 10) / 10;
  return amount >= 0 ? !(hasDecimal(amount)) ?
    `$${(amount)}`
    :
    `$${numberFormatAmount(amount, size)}`
    : `$${numberFormatAmount(Math.abs(amount), size)}`
    ;
}

function numberFormat(amount, size) {
  // You can customize the number formatting logic here if needed
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: size,
    maximumFractionDigits: size,
  }).format(amount);
}

export function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

export function replaceSpacesWithDashes(text) {
  // Use a regular expression to replace spaces with dashes
  return text.replace(/\s+/g, '-');
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0
}


export function formatNumber(num, size = 6) {
  return `L&P${num.toString().padStart(size, '0')}`;
}
export function short_text(text, length = 25) {
  // Remove HTML tags using a regular expression
  const cleanText = text?.replace(/<\/?[^>]+(>|$)/g, "");

  if (cleanText?.length > length) {
    let str = cleanText.substring(0, length);
    return str + "...";
  } else {
    return cleanText;
  }
}

export function formatDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();



  return `${day} ${month} ${year}`;
}

export function blogDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();



  return `${month} ${day}, ${year}`;
}

export function checkForEmptyValues(data) {
  for (const key in data) {
    if (data[key] === null || data[key] === "") {
      return key; // Return the key with the empty/null value
    }
  }
  return false; // Return null if no empty/null values are found
}

export function isArrayEmpty(arr) {
  return arr.length === 0;
}

export function getArrayCount(arr) {
  return arr.length;
}

export function getObjKeyCount(obj) {
  return Object.keys(obj).length;
};

export function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${day} ${month} ${year} | ${formattedHours} : ${formattedMinutes}`;
}

export function getPercentageAmount(amount, percentage, only_percent = false) {
  amount = parseFloat(amount)
  percentage = parseFloat(percentage)

  let percentAmount = (amount / 100) * percentage
  if (only_percent) {
    return percentAmount
  }
  else {
    return amount - percentAmount
  }

}
export function subscriptionStatus(status) {
  if (status == 'active') {
    return <span className="badge rounded-pill bg-success">Active</span>
  } else if (status == 'non-renewing') {
    return <span className="badge rounded-pill bg-warning">Non Renewing</span>

  } else {
    return <span className="badge rounded-pill bg-danger">Cancelled</span>
  }

}

export function bytesToMegaBytes(bytes) {
  return bytes / (1024 * 1024);
}

export async function FileUpload(event, type = 'attchments', file_name) {
  const fd = new FormData();
  fd.append("file", event);
  fd.append("type", type);
  fd.append("file_name", file_name);

  return http.post("upload-file", fd).then((res) => {
    return res.data;
  });
}
export async function uploadMultiFiles(event, type) {
  let newImages = [];
  let images_arr = event.target.files;
  for (let i = 0; i < images_arr.length; i++) {
    let fileSize = images_arr[i].size;
    let fileName = images_arr[i].name;

    let sizeMb = bytesToMegaBytes(fileSize);
    if (sizeMb < 40) {
      let image = await FileUpload(images_arr[i], type, fileName).then((data) => {
        if (data.file != undefined && data?.status === 1) {
          newImages.push({ file: data.file, file_name: data?.file_name_text });
        }
        else if (data?.status === 0) {
          toast.error(data?.msg);
          return;
        }
      });
    }
  }
  return newImages;

}

export const convertNumberFormatToUnits = (value) => {
  if (Math.abs(value) >= 1e9) {
    // Value is in billions
    return (value / 1e9).toFixed(1) + 'B';
  } else if (Math.abs(value) >= 1e6) {
    // Value is in millions
    return (value / 1e6).toFixed(1) + 'M';
  } else if (Math.abs(value) >= 1e3) {
    // Value is in thousands
    return (value / 1e3).toFixed(1) + 'K';
  } else {
    // Value is less than 1000
    return value.toString();
  }
};

export function formatDateTimeWithTimezone(dateTimeString) {
  const date = new Date(dateTimeString);

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  };

  const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
  const formattedDateTime = dateTimeFormat.formatToParts(date);

  const day = formattedDateTime.find(part => part.type === 'day').value;
  const month = formattedDateTime.find(part => part.type === 'month').value;
  const year = formattedDateTime.find(part => part.type === 'year').value;
  const hours = formattedDateTime.find(part => part.type === 'hour').value;
  const minutes = formattedDateTime.find(part => part.type === 'minute').value;

  // Calculate GMT offset
  const timeZoneOffset = date.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(timeZoneOffset) / 60);
  const offsetMinutes = Math.abs(timeZoneOffset) % 60;

  // Format the GMT offset
  const gmtOffset = `GMT${timeZoneOffset >= 0 ? '-' : '+'}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;

  return `${day} ${month} ${year} | ${hours}:${minutes} ${gmtOffset}`;
}


export function getDocumentsStatus(status) {
  if (status == 'requested') {
    return <span className="badge grey">Requested</span>
  } else if (status == 'under_review') {
    return <span className="badge blue">Under review</span>

  } else if (status == 'pending') {
    return <span className="badge yellow">Pending</span>

  } else if (status == 'approved') {
    <span className="badge green">Approved</span>
  } else {
    return <span className="badge grey">Requested</span>
  }

}

export function getSubsStatus(status) {
  if (status == 'trialing') {
    return <span className="badge blue">Trail</span>
  } else if (status == 'active') {
    return <span className="badge greeb">Active</span>

  } else if (status == 'pending') {
    return <span className="badge yellow">Pending</span>

  } else if (status == 'approved') {
    <span className="badge green">Approved</span>
  } else {
    return <span className="badge grey">Loading...</span>
  }

}

export function getFileExtension(filename) {

  const parts = filename?.split(".");
  return parts[parts.length - 1]?.toLowerCase();

}

export const formatNumbertoZeroPadding = (number) => {
  return number < 10 ? `0${number}` : `${number}`;
};