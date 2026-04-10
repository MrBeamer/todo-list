import { format } from "date-fns";

const capitalize = (word) => {
  const firstLetter = word.toUpperCase().slice(0, 1);
  const restOfWord = word.toLowerCase().slice(1);
  return firstLetter + restOfWord;
};

// Formate date in different approaches
const now = new Date();
const currentDate = format(now, "EEEE, dd MMMM yyyy"); // Saturday, 28 March 2026, 02:35 PM

const formateDate = (date, option) => {
  if (option === "ger") {
    return format(date, "dd.MM.yyyy"); // 20.02.2026
  } else if (option === "inter") {
    return format(date, "dd MMM yyyy"); // 20 Feb 2026
  } else if (option === "long") {
    format(date, "EEEE, dd MMMM yyyy"); // Saturday, 28 March 2026
  } else if (option === "time") {
    return format(now, "HH:mm"); // 12:10 Uhr
  }
};

// Create dynamic welcome Message
const calcTimePhrase = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 17) return "Afternoon";
  if (hour >= 17 && hour < 21) return "Evening";
  return "Night";
};

export { capitalize, currentDate, calcTimePhrase, formateDate };
