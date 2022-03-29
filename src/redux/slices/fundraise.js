import { sum, map, filter, uniqBy, reject, sumBy, maxBy, MinBy } from "lodash";
import moment from "moment";
import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  posts: [],
  post: null,
  recentPosts: [],
  hasMore: true,
  index: 0,
  step: 3,

  checkout: {
    activeStep: -1,

    uid: "",
    type: null,
    live: null,
    category: "",
    goal: 1000,
    cover: null,
    title: "",
    description: null,
    link: "",
    // team: { name: "", cover: null },
    allows: { allowComment: false, allowDonation: false, allowSearch: false },
    isDeleted: false,
  },
};

const slice = createSlice({
  name: "fundraise",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET POSTS
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },

    // GET POST INFINITE
    getPostsInitial(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },

    getMorePosts(state) {
      const setIndex = state.index + state.step;
      state.index = setIndex;
    },

    noHasMore(state) {
      state.hasMore = false;
    },

    // GET POST
    getPostSuccess(state, action) {
      state.isLoading = false;
      state.post = action.payload;
    },

    // GET RECENT POST
    getRecentPostsSuccess(state, action) {
      state.isLoading = false;
      state.recentPosts = action.payload;
    },

    setCheckout(state, action) {
      const { name, value } = action.payload;
      state.checkout = { ...state.checkout, [name]: value };
    },

    resetCheckout(state) {
      state.checkout.activeStep = -1;

      state.checkout.uid = "";
      state.checkout.type = null;
      state.checkout.live = null;
      state.checkout.category = "";
      state.checkout.goal = 1000;
      state.checkout.cover = null;
      state.checkout.title = "";
      state.checkout.description = "";
      state.checkout.link = "";
      // state.checkout.team = {
      //   name: "",
      //   cover: null,
      // };
      state.checkout.allows = {
        allowComment: false,
        allowDonation: false,
        allowSearch: false,
      };
      state.checkout.isDeleted = false;
    },

    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },

    onNextStep(state) {
      state.checkout.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getMorePosts,
  getPostSuccess,
  setCheckout,
  resetCheckout,
  onGotoStep,
  onBackStep,
  onNextStep,
} = slice.actions;

// ----------------------------------------------------------------------

export function addPost(post) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/fundraise/add", {
        ...post,
      });

      dispatch(slice.actions.getPostSuccess(response.data.results));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function addUpdate(update) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/update/add", {
        ...update,
      });

      // dispatch(slice.actions.getPostSuccess(response.data.donate));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updatePost(post) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/fundraise/update", {
        ...post,
      });

      // dispatch(slice.actions.getPostSuccess(response.data.results));
      dispatch(getPost(post.uid));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getAllPosts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/fundraise/posts/all");
      dispatch(slice.actions.getPostsSuccess(response.data.posts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPostsInitial(index, step) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/fundraise/posts", {
        params: { index, step },
      });
      const results = response.data.results.length;
      const { maxLength } = response.data;

      dispatch(slice.actions.getPostsInitial(response.data.results));

      if (results >= maxLength) {
        dispatch(slice.actions.noHasMore());
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPost(uid) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/fundraise/post", {
        params: { uid },
      });
      dispatch(slice.actions.getPostSuccess(response.data.post));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError());
    }
  };
}

// ----------------------------------------------------------------------

export function getRecentPosts(title) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/fundraise/posts/recent", {
        params: { title },
      });

      dispatch(slice.actions.getRecentPostsSuccess(response.data.recentPosts));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError());
    }
  };
}

// ----------------------------------------------------------------------

export function deletePost(uid) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/fundraise/delete", {
        params: { uid },
      });
      dispatch(slice.actions.getPostSuccess(response.data.post));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError());
    }
  };
}
