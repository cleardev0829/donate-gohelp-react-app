import faker from "faker";
import { sample } from "lodash";
import { paramCase } from "change-case";
// utils
import { mockImgProduct } from "../utils/mockImages";
//
import mock from "./mock";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// ----------------------------------------------------------------------

mock.onPost("/api/donate/add").reply(async (request) => {
  try {
    const data = JSON.parse(request.data);

    await firebase
      .firestore()
      .collection("donate")
      .add({
        ...data,
      });

    return [200, { data }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

// ----------------------------------------------------------------------
