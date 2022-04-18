import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// slices
import mailReducer from "./slices/mail";
import chatReducer from "./slices/chat";
import blogReducer from "./slices/blog";
import userReducer from "./slices/user";
import productReducer from "./slices/product";
import calendarReducer from "./slices/calendar";
import kanbanReducer from "./slices/kanban";
import postReducer from "./slices/post";
import donateReducer from "./slices/donate";
import updateReducer from "./slices/update";
import donationReducer from "./slices/donation";
import fundraiseReducer from "./slices/fundraise";
import fundraiserReducer from "./slices/fundraiser";
import historyReducer from "./slices/history";
import favoriteReducer from "./slices/favorite";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const productPersistConfig = {
  key: "product",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};

const donatePersistConfig = {
  key: "donate",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  blog: blogReducer,
  user: userReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  postReducer: postReducer,
  product: persistReducer(productPersistConfig, productReducer),
  // donate: persistReducer(donatePersistConfig, donateReducer),
  donate: donateReducer,
  update: updateReducer,
  donation: donationReducer,
  fundraise: fundraiseReducer,
  fundraiser: fundraiserReducer,
  history: historyReducer,
  favorite: favoriteReducer,
});

export { rootPersistConfig, rootReducer };
