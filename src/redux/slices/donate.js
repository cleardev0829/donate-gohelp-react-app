import { sum, map, filter, uniqBy, reject } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  donates: [],
  donate: null,
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

    amount: null,
    tipAmount: null,
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

    // GET DONATE
    getDonateSuccess(state, action) {
      state.isLoading = false;
      state.donate = action.payload;
    },

    // DELETE DONATE
    deleteDonate(state, action) {
      state.donates = reject(state.donates, { id: action.payload });
    },

    //  SORT & FILTER DONATES
    sortByDonates(state, action) {
      state.sortBy = action.payload;
    },

    filterDonates(state, action) {
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
        cart.map((donate) => donate.price * donate.quantity)
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
      const donate = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, donate];
      } else {
        state.checkout.cart = map(state.checkout.cart, (_donate) => {
          const isExisted = _donate.id === donate.id;
          if (isExisted) {
            return {
              ..._donate,
              quantity: _donate.quantity + 1,
            };
          }
          return _donate;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, donate], "id");
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

      state.checkout.amount = null;
      state.checkout.tipAmount = null;
      state.checkout.message = null;
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
      const donateId = action.payload;
      const updateCart = map(state.checkout.cart, (donate) => {
        if (donate.id === donateId) {
          return {
            ...donate,
            quantity: donate.quantity + 1,
          };
        }
        return donate;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const donateId = action.payload;
      const updateCart = map(state.checkout.cart, (donate) => {
        if (donate.id === donateId) {
          return {
            ...donate,
            quantity: donate.quantity - 1,
          };
        }
        return donate;
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
  deleteDonate,
  createBilling,
  applyShipping,
  applyDiscount,
  filterDonates,
  sortByDonates,
  increaseQuantity,
  decreaseQuantity,

  applyCheckout,
} = slice.actions;

// ----------------------------------------------------------------------

export function addDonate(donate) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/donate/add", {
        ...donate,
      });

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
      dispatch(slice.actions.getDonatesSuccess(response.data.donates));
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
