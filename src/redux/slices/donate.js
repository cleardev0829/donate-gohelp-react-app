import { sum, map, filter, uniqBy, reject, maxBy, sumBy, minBy } from "lodash";
import moment from "moment";
import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
import { diff } from "src/utils/constants";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  donates: [],
  donate: null,
  recentDonates: [],
  hasMore: true,
  index: 0,
  step: 3,

  checkout: {
    activeStep: -1,

    crypto: { type: "", count: 0 },
    tip: 0,
    message: "",
  },
};

const slice = createSlice({
  name: "donate",
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

    // GET DONATES
    getDonatesSuccess(state, action) {
      state.isLoading = false;
      state.donates = action.payload;
    },

    // GET DONATE INFINITE
    getDonatesInitial(state, action) {
      state.isLoading = false;
      state.donates = action.payload;
    },

    getMoreDonates(state) {
      const setIndex = state.index + state.step;
      state.index = setIndex;
    },

    noHasMore(state) {
      state.hasMore = false;
    },

    // GET DONATE
    getDonateSuccess(state, action) {
      state.isLoading = false;
      state.donate = action.payload;
    },

    // GET RECENT DONATE
    getRecentDonatesSuccess(state, action) {
      state.isLoading = false;
      state.recentPosts = action.payload;
    },

    setCheckout(state, action) {
      const { name, value } = action.payload;
      state.checkout = { ...state.checkout, [name]: value };
    },

    resetCheckout(state) {
      state.checkout.activeStep = -1;

      state.checkout.crypto = { type: "", count: 0 };
      state.checkout.tip = 0;
      state.checkout.message = "";
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
  getMoreDonates,
  setCheckout,
  resetCheckout,
  onGotoStep,
  onBackStep,
  onNextStep,
} = slice.actions;

// ----------------------------------------------------------------------

export function addDonate(donate) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/donate/add", {
        ...donate,
      });
      console.log("------------2", response.data);
      dispatch(slice.actions.getDonateSuccess(response.data.donate));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getDonates() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/donates");
      dispatch(slice.actions.getDonatesSuccess(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getDonatesInitial(id, index, step) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/donate/posts", {
        params: { id, index, step },
      });
      const results = response.data.results.length;
      const { maxLength } = response.data;

      dispatch(slice.actions.getDonatesInitial(response.data.results));

      if (results >= maxLength) {
        dispatch(slice.actions.noHasMore());
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getDonatesById(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/donates/getDonatesById", {
        params: { id },
      });
      dispatch(slice.actions.filterDonates(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getDonate(name) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/donates/donate", {
        params: { name },
      });
      dispatch(slice.actions.getDonateSuccess(response.data.donate));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
