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

mock.onGet("/api/history/posts").reply(async (config) => {
  try {
    const { index, step, account } = config.params;
    const loadMore = index + step;

    let posts = [];

    await firebase
      .firestore()
      .collection("fundraise")
      .where("donors", "array-contains", account)
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
