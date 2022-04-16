/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-useless-escape */
import _ from "lodash";
import mock from "./mock";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// ----------------------------------------------------------------------

mock.onGet("/api/favorite/posts").reply(async (config) => {
  try {
    const { index, step, account } = config.params;
    const loadMore = index + step;

    let posts = [];

    await firebase
      .firestore()
      .collection("fundraise")
      .where("favoritors", "array-contains", account)
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

mock.onPost("/api/favorite/add").reply(async (request) => {
  try {
    const data = JSON.parse(request.data);

    await firebase
      .firestore()
      .collection("fundraise")
      .doc(data.fundraiseId)
      .update({
        favoritors: firebase.firestore.FieldValue.arrayUnion(data.account),
        favorites: firebase.firestore.FieldValue.arrayUnion({ ...data }),
      });

    return [200, { data }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

// ----------------------------------------------------------------------

mock.onPost("/api/favorite/remove").reply(async (request) => {
  try {
    const data = JSON.parse(request.data);

    await firebase
      .firestore()
      .collection("fundraise")
      .doc(data.fundraiseId)
      .update({
        favoritors: firebase.firestore.FieldValue.arrayRemove(data.account),
        favorites: firebase.firestore.FieldValue.arrayRemove({ ...data }),
      });

    return [200, { data }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});
