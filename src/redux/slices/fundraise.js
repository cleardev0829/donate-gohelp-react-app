import { sum, map, filter, uniqBy, reject } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  fundraises: [],
  fundraise: null,
  sortBy: null,
  filters: {
    gender: [],
    category: "All",
    colors: [],
    priceRange: "",
    rating: "",
  },
  checkout: {
    activeStep: -1,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,

    type: null,
    live: "",
    category: "",
    goal: 0,
    file: null,
    youTubeLink: "",
    title: "",
    description: "",
    email: "",
    link: "Fundraiser link: https://www.gohelp.com/f/....",
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

    // GET FUNDRAISES
    getFundraisesSuccess(state, action) {
      state.isLoading = false;
      state.fundraises = action.payload;
    },

    // GET FUNDRAISE
    getFundraiseSuccess(state, action) {
      state.isLoading = false;
      state.fundraise = action.payload;
    },

    // DELETE FUNDRAISE
    deleteFundraise(state, action) {
      state.fundraises = reject(state.fundraises, { id: action.payload });
    },

    //  SORT & FILTER FUNDRAISES
    sortByFundraises(state, action) {
      state.sortBy = action.payload;
    },

    filterFundraises(state, action) {
      state.filters.gender = action.payload.gender;
      state.filters.category = action.payload.category;
      state.filters.colors = action.payload.colors;
      state.filters.priceRange = action.payload.priceRange;
      state.filters.rating = action.payload.rating;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;

      const subtotal = sum(
        cart.map((fundraise) => fundraise.price * fundraise.quantity)
      );
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;
    },

    addCart(state, action) {
      const fundraise = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, fundraise];
      } else {
        state.checkout.cart = map(state.checkout.cart, (_fundraise) => {
          const isExisted = _fundraise.id === fundraise.id;
          if (isExisted) {
            return {
              ..._fundraise,
              quantity: _fundraise.quantity + 1,
            };
          }
          return _fundraise;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, fundraise], "id");
    },

    deleteCart(state, action) {
      const updateCart = filter(
        state.checkout.cart,
        (item) => item.id !== action.payload
      );

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = -1;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;

      state.checkout.type = null;
      state.checkout.live = "";
      state.checkout.category = "";
      state.checkout.goal = 0;
      state.checkout.file = null;
      state.checkout.youTubeLink = "";
      state.checkout.title = "";
      state.checkout.description = "";
      state.checkout.email = "";
      state.checkout.link = "Fundraiser link: https://www.gohelp.com/f/....";
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

    increaseQuantity(state, action) {
      const fundraiseId = action.payload;
      const updateCart = map(state.checkout.cart, (fundraise) => {
        if (fundraise.id === fundraiseId) {
          return {
            ...fundraise,
            quantity: fundraise.quantity + 1,
          };
        }
        return fundraise;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const fundraiseId = action.payload;
      const updateCart = map(state.checkout.cart, (fundraise) => {
        if (fundraise.id === fundraiseId) {
          return {
            ...fundraise,
            quantity: fundraise.quantity - 1,
          };
        }
        return fundraise;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total =
        state.checkout.subtotal - state.checkout.discount + shipping;
    },

    applyType(state, action) {
      const type = action.payload;
      state.checkout.type = type;
    },

    applyBasic(state, action) {
      const { live, category } = action.payload;
      state.checkout.basic = { live, category };
    },

    applyCheckout(state, action) {
      const { name, value } = action.payload;
      state.checkout = { ...state.checkout, [name]: value };
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  deleteFundraise,
  createBilling,
  applyShipping,
  applyDiscount,
  filterFundraises,
  sortByFundraises,
  increaseQuantity,
  decreaseQuantity,

  applyType,
  applyBasic,
  applyCheckout,
} = slice.actions;

// ----------------------------------------------------------------------

export function getFundraises() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/fundraises");
      dispatch(slice.actions.getFundraisesSuccess(response.data.fundraises));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFundraise(name) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/fundraises/fundraise", {
        params: { name },
      });
      dispatch(slice.actions.getFundraiseSuccess(response.data.fundraise));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addFundraise(fundraise) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/fundraise/add", { ...fundraise });
      dispatch(slice.actions.getFundraiseSuccess(response.data.fundraise));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
