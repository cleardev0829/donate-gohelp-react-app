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
    console.log(data);
    await firebase
      .firestore()
      .collection("fundraise")
      .doc(data.fundraiseId)
      .update({
        donors: firebase.firestore.FieldValue.arrayUnion(data.account),
        donates: firebase.firestore.FieldValue.arrayUnion({ ...data }),
      });

    return [200, { data }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

// ----------------------------------------------------------------------

mock.onGet("/api/donate/posts").reply(async (config) => {
  try {
    const { index, step, uid } = config.params;
    const loadMore = index + step;

    let posts = [];

    const docRef = await firebase
      .firestore()
      .collection("fundraise")
      .doc(uid)
      .get();

    posts = docRef.data().donates;

    const maxLength = posts.length;
    const sortPosts = await [...posts].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const results = await sortPosts.slice(0, loadMore);

    if (!results) {
      return [404, { message: "data not found" }];
    }

    return [200, { results, maxLength }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});
