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
      })
      .then(() =>
        firebase
          .firestore()
          .collection("fundraise")
          .doc(data.fundraiseId)
          .collection("donate")
          .add({
            ...data,
          })
      );

    return [200, { data }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

// ----------------------------------------------------------------------

mock.onGet("/api/donate/posts").reply(async (config) => {
  try {
    const { id, index, step } = config.params;
    const loadMore = index + step;

    let posts = [];

    await firebase
      .firestore()
      .collection("fundraise")
      .doc(id)
      .collection("donate")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map(async (doc) => {
          posts.push({
            ...doc.data(),
            id: doc.id,
          });
        });
      });

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

// ----------------------------------------------------------------------

mock.onGet("/api/donates").reply(async (config) => {
  try {
    const { index, step } = config.params;
    const loadMore = index + step;

    let posts = [];

    await firebase
      .firestore()
      .collection("donates")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
      });

    const maxLength = posts.length;
    const sortPosts = [...posts].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const results = sortPosts.slice(0, loadMore);

    if (!results) {
      return [404, { message: "data not found" }];
    }

    return [200, { results, maxLength }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

// ----------------------------------------------------------------------

mock.onGet("/api/donates/getDonatesById").reply(async (config) => {
  try {
    const { id } = config.params;

    let posts = [];
    await firebase
      .firestore()
      .collection("fundraise")
      .doc(id)
      .collection("donate")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
      });

    const results = posts;

    if (!results) {
      return [404, { message: "data not found" }];
    }

    return [200, { results }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

// ----------------------------------------------------------------------
