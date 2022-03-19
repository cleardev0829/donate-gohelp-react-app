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

export const STEPS = ["Basics", "Goal", "Photo", "Story", "Donation"];

export const COUNTRIES = [
  { id: "Canada", value: "Canada" },
  { id: "France", value: "France" },
  { id: "Japan", value: "Japan" },
];

export const CRYPTO_TYPES = ["BTC", "ETH"];

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
