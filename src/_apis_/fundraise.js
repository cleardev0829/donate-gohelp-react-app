/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-useless-escape */
import _ from "lodash";
import faker from "faker";
import moment from "moment";
import { paramCase } from "change-case";
// utils
import { mockImgCover } from "../utils/mockImages";
//
import mock from "./mock";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { getFileBlob } from "src/utils/constants";

// ----------------------------------------------------------------------

mock.onPost("/api/fundraise/add").reply(async (request) => {
  const data = JSON.parse(request.data);

  return new Promise((resolve, reject) => {
    if (data.cover && data.cover.preview) {
      getFileBlob(data.cover.preview, (blob) => {
        firebase
          .storage()
          .ref(`/${data.uid}/fundraise-${data.cover.path}`)
          .put(blob)
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then(async (url) => {
              await firebase
                .firestore()
                .collection("fundraise")
                .doc(data.uid)
                .set({
                  ...data,
                  cover: {
                    ...data.cover,
                    preview: url,
                  },
                });

              resolve([200, { results: data }]);
            });
          });
      });
    } else {
      firebase
        .firestore()
        .collection("fundraise")
        .doc(data.uid)
        .set({
          ...data,
        });

      resolve([200, { results: data }]);
    }
  });
});

// ----------------------------------------------------------------------

mock.onPost("/api/fundraise/update").reply(async (request) => {
  try {
    const data = JSON.parse(request.data);

    let promise = [];
    promise.push(
      new Promise(async (resolve, reject) => {
        if (data.cover && data.cover.preview && data.cover.touched) {
          getFileBlob(data.cover.preview, (blob) => {
            firebase
              .storage()
              .ref(`/${data.uid}/fundraise-${data.cover.path}`)
              .put(blob)
              .then((snapshot) => {
                snapshot.ref.getDownloadURL().then(async (url) => {
                  await firebase
                    .firestore()
                    .collection("fundraise")
                    .doc(data.uid)
                    .update({
                      ...data,
                      cover: {
                        ...data.cover,
                        preview: url,
                      },
                    });

                  resolve();
                });
              });
          });
        } else {
          await firebase
            .firestore()
            .collection("fundraise")
            .doc(data.uid)
            .update({
              ...data,
            });

          resolve();
        }
      })
    );

    await Promise.all(promise);

    return await [200, { results: data }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

// ----------------------------------------------------------------------

mock.onGet("/api/fundraise/posts/all").reply(async () => {
  try {
    const { index, step } = config.params;
    const loadMore = index + step;

    let posts = [];

    await firebase
      .firestore()
      .collection("fundraise")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          posts.push({
            ...doc.data(),
            id: doc.id,
          });
        });
      });

    const sortPosts = [...posts].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const results = sortPosts;

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

mock.onGet("/api/fundraise/posts").reply(async (config) => {
  try {
    const { index, step, fAccount, dAccount, fvAccount } = config.params;
    const loadMore = index + step;

    let posts = [];

    let dbRef = firebase.firestore().collection("fundraise");

    if (fAccount) {
      dbRef = dbRef.where("account", "==", fAccount);
    }

    await dbRef.get().then((querySnapshot) => {
      querySnapshot.docs.map(async (doc) => {
        posts.push({
          ...doc.data(),
          id: doc.id,
          donatesWithOnlyAccount: _.map(doc.data().donates, "account"),
          updatesWithOnlyAccount: _.map(doc.data().updates, "account"),
          favoritesWithOnlyAccount: _.map(doc.data().favorites, "account"),
        });
      });
    });

    if (dAccount) {
      posts = _.filter(posts, (item) =>
        item.donatesWithOnlyAccount.includes(dAccount)
      );
    }

    if (fvAccount) {
      posts = _.filter(posts, (item) =>
        item.favoritesWithOnlyAccount.includes(fvAccount)
      );
    }

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

mock.onGet("/api/fundraise/post").reply(async (config) => {
  try {
    const { uid } = config.params;

    const docRef = await firebase
      .firestore()
      .collection("fundraise")
      .doc(uid)
      .get();

    const post = docRef.data();

    if (!post) {
      return [404, { message: "Post not found" }];
    }

    return [200, { post: post }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

// ----------------------------------------------------------------------

mock.onGet("/api/fundraise/posts/recent").reply((config) => {
  try {
    const { title } = config.params;

    const recentPosts = posts
      .filter((_post) => paramCase(_post.title) !== title)
      .slice(posts.length - 5, posts.length);

    if (!recentPosts) {
      return [404, { message: "Post not found" }];
    }

    return [200, { recentPosts }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

// ----------------------------------------------------------------------

mock.onGet("/api/fundraise/posts/search").reply((config) => {
  try {
    const { query } = config.params;
    const cleanQuery = query.toLowerCase().trim();
    const results = [];

    posts.forEach((post) => {
      if (!query) {
        return results.push(post);
      }

      if (post.title.toLowerCase().includes(cleanQuery)) {
        return results.push(post);
      }
    });

    return [200, { results }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

// ----------------------------------------------------------------------

mock.onGet("/api/fundraise/delete").reply(async (config) => {
  try {
    const { uid } = config.params;

    await firebase.firestore().collection("fundraise").doc(uid).update({
      isDeleted: true,
    });

    const results = config.params;

    if (!results) {
      return [404, { message: "Post not found" }];
    }

    return [200, { results }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});
