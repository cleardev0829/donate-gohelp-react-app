import moment from "moment";

export const CRYPTO_PRICE = {
  BTC: 43602.25,
  ETH: 3098.56,
  SOL: 102.84,
};

export const cryptoToUSD = ({ type, count }) => {
  if (!type) return 0;
  return CRYPTO_PRICE[type] * parseFloat(count);
};

export const makePageLink = (uid) => {
  return `${window.location.origin}/donate/${uid}`;
};

export const getFileBlob = (url, cb) => {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.addEventListener("load", function () {
    cb(xhr.response);
  });
  xhr.send();
};

export const diff = (m1, m2) => {
  let diff = "";

  const min = m1.diff(m2, "minutes");
  const hour = m1.diff(m2, "hours");
  const day = m1.diff(m2, "days");

  if (min < 2) diff = "a few seconds";
  else if (min < 60) diff = `${min} mins ago`;
  else if (hour < 2) diff = `${hour} hour ago`;
  else if (hour < 24) diff = `${hour} hours ago`;
  else if (day < 2) diff = `${day} day ago`;
  else diff = `${day} days ago`;

  return diff;
};

export const filters = (donates) => {
  if (donates.length === 0) {
    return {
      recentTimeAgo: "",
      recentAmount: 0,
      firstAmount: 0,
      totalAmount: 0,
      maxAmount: 0,
      minAmount: 0,
      counts: 0,
    };
  } else {
    return {
      count: donates.length,
      recentAmount: _.maxBy(donates, (item) => item.createdAt).crypto.amount,
      totalAmount: _.sumBy(donates, (item) => parseFloat(item.crypto.amount)),
      firstAmount: _.minBy(donates, (item) => item.createdAt).crypto.amount,
      maxAmount: _.maxBy(donates, (item) => parseFloat(item.crypto.amount))
        .crypto.amount,
      minAmount: _.minBy(donates, (item) => parseFloat(item.crypto.amount))
        .crypto.amount,
      recentTimeAgo: diff(
        moment(),
        _.maxBy(donates, (item) => item.createdAt).createdAt
      ),
    };
  }
};

export const STEPS = ["Basics", "Goal", "Photo", "Story", "Donation"];

export const CRYPTO_TYPES = ["BTC", "ETH", "SOL"];

export const CATEGORIES = [
  "",
  "Medical",
  "Memorial",
  "Emergency",
  "Nonprofit",
  "Education",
  "Animals",
  "Environment",
  "Business",
  "Community",
  "Competition",
  "Creative",
  "Event",
  "Faith",
  "Family",
  "Sports",
  "Travel",
  "Volunteer",
  "Wishes",
];

export const FUNDRAISE_TYPES = [
  "For yourself",
  "For a friend",
  "For a charity",
];
