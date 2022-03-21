/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-useless-escape */
import faker from "faker";
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
  try {
    const data = JSON.parse(request.data);

    if (data.cover && data.cover.preview) {
      await getFileBlob(data.cover.preview, (blob) => {
        firebase
          .storage()
          .ref(`/photo/${data.uid}-${data.cover.path}`)
          .put(blob)
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then(async (url) => {
              await firebase
                .firestore()
                .collection("fundraise")
                .doc(data.uid)
                .set({
                  ...data,
                  coverUrl: url,
                });
            });
          });
      });
    } else {
      await firebase
        .firestore()
        .collection("fundraise")
        .doc(data.uid)
        .set({
          ...data,
        });
    }

    return [200, { results: data }];
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
          posts.push({ ...doc.data(), id: doc.id });
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
    const { index, step } = config.params;
    const loadMore = index + step;

    let posts = [];

    await firebase
      .firestore()
      .collection("fundraise")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map(async (doc) => {
          posts.push({
            ...doc.data(),
            id: doc.id,
          });
        });
      });

    let promise = [];
    let postsWithDonates = [];

    posts.map((post) => {
      promise.push(
        new Promise((resolve, reject) => {
          const donates = [];
          firebase
            .firestore()
            .collection("fundraise")
            .doc(post.id)
            .collection("donate")
            .get()
            .then((snapshot) => {
              snapshot.docs.map((doc) => {
                donates.push({ ...doc.data(), id: doc.id });
              });

              postsWithDonates.push({ ...post, donates });

              resolve(postsWithDonates);
            });
        })
      );
    });

    await Promise.all(promise);

    const maxLength = postsWithDonates.length;
    const sortPosts = await [...postsWithDonates].sort((a, b) => {
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

    const donates = [];
    await firebase
      .firestore()
      .collection("fundraise")
      .doc(uid)
      .collection("donate")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          donates.push({ ...doc.data(), id: doc.id });
        });
      });

    const postWithDonates = {
      ...post,
      donates,
    };

    if (!postWithDonates) {
      return [404, { message: "Post not found" }];
    }

    return [200, { post: postWithDonates }];
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
