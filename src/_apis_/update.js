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

import { getFileBlob } from "src/utils/constants";

// ----------------------------------------------------------------------

mock.onPost("/api/update/add").reply(async (request) => {
  const data = JSON.parse(request.data);

  return new Promise((resolve, reject) => {
    if (data.cover && data.cover.preview) {
      getFileBlob(data.cover.preview, (blob) => {
        firebase
          .storage()
          .ref(`/${data.uid}/update-${data.cover.path}`)
          .put(blob)
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then(async (url) => {
              await firebase
                .firestore()
                .collection("fundraise")
                .doc(data.fundraiseId)
                .update({
                  updates: firebase.firestore.FieldValue.arrayUnion({
                    ...data,
                    cover: {
                      ...data.cover,
                      preview: url,
                    },
                  }),
                });

              resolve([200, { results: data }]);
            });
          });
      });
    } else {
      firebase
        .firestore()
        .collection("fundraise")
        .doc(data.fundraiseId)
        .update({
          updates: firebase.firestore.FieldValue.arrayUnion({
            ...data,
          }),
        });

      resolve([200, { results: data }]);
    }
  });
});

// ----------------------------------------------------------------------

mock.onGet("/api/update/posts").reply(async (config) => {
  try {
    const { index, step, uid } = config.params;
    const loadMore = index + step;

    let posts = [];

    const docRef = await firebase
      .firestore()
      .collection("fundraise")
      .doc(uid)
      .get();

    posts = docRef.data().updates;

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
