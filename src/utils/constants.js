import moment from "moment";

// export const ADDRESS = "0x2c3A2a9fBB92947216E2B5d5CD9B87cC4FDD0591"; //@uvin0
export const ADDRESS = "0x76bA5D887BDACdd5bD721c9be074526f8361fEEb"; // Anatollo's wallet

export const CRYPTO_TYPES = [
  { name: "BTC", price: 43602.25, type: "" },
  { name: "ETH", price: 3098.56, type: "native" },
  { name: "SOL", price: 102.84, type: "sol" },
];

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
  if (!donates || donates.length === 0) {
    return {
      counts: 0,
      totalAmount: 0,
      recentTimeAgo: "",
      recentDonation: { account: "", crypto: { amount: 0 } },
      firstDonation: { account: "", crypto: { amount: 0 } },
      topDonation: { account: "", crypto: { amount: 0 } },
    };
  } else {
    return {
      count: donates.length,
      totalAmount: _.sumBy(donates, (item) => parseFloat(item.crypto.amount)),
      recentDonation: _.maxBy(donates, (item) => item.createdAt),
      firstDonation: _.minBy(donates, (item) => item.createdAt),
      topDonation: _.maxBy(donates, (item) => parseFloat(item.crypto.amount)),
      recentTimeAgo: diff(
        moment(),
        _.maxBy(donates, (item) => item.createdAt).createdAt
      ),
    };
  }
};

export const STEPS = ["Basics", "Goal", "Photo", "Story", "Donation"];

export const CATEGORIES = [
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
