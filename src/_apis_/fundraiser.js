/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-useless-escape */
import faker from "faker";
import { paramCase } from "change-case";
// utils
import { mockFundraiserImgCover } from "../utils/mockImages";
//
import mock from "./mock";

// ----------------------------------------------------------------------

const POST_TITLES = [
  "Whiteboard Templates By Industry Leaders",
  "Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!",
  "Designify Agency Landing Page Design",
  "✨What is Done is Done ✨",
  "Fresh Prince",
  "Six Socks Studio",
  "vincenzo de cotiis’ crossing over showcases a research on contamination",
  "Simple, Great Looking Animations in Your Project | Video Tutorial",
  "40 Free Serif Fonts for Digital Designers",
  "Examining the Evolution of the Typical Web Design Client",
  "Katie Griffin loves making that homey art",
  "The American Dream retold through mid-century railroad graphics",
  "Illustration System Design",
  "CarZio-Delivery Driver App SignIn/SignUp",
  "How to create a client-serverless Jamstack app using Netlify, Gatsby and Fauna",
  "Tylko Organise effortlessly -3D & Motion Design",
  "RAYO ?? A expanded visual arts festival identity",
  "Anthony Burrill and Wired mag’s Andrew Diprose discuss how they made January’s Change Everything cover",
  "Inside the Mind of Samuel Day",
  "Portfolio Review: Is This Portfolio Too Creative?",
  "Akkers van Margraten",
  "Gradient Ticket icon",
  "Here’s a Dyson motorcycle concept that doesn’t ‘suck’!",
  "How to Animate a SVG with border-image",
];

const COUNTRIES = [
  "Canada",
  "Austria",
  "Germany",
  "Ukraine",
  "England",
  "Serbia",
  "France",
  "China",
  "Russia",
  "Indonesia",
  "India",
];

const users = [...Array(12)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: `31a6d8e0-12d4-4aef-88c3-39229ea852f7-${setIndex}`,
    name: faker.name.findName(),
    avatarUrl: `/static/mock-images/avatars/avatar_${setIndex}.jpg`,
  };
});

let posts = [...Array(3)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: `0feb2990-4210-4170-93a4-37e8f5958a18-${setIndex}`,
    cover: mockFundraiserImgCover(setIndex),
    title: POST_TITLES[setIndex],
    description: faker.lorem.paragraph(),
    country: COUNTRIES[index],
    createdAt: faker.date.past(),
    view: faker.datatype.number(),
    comment: faker.datatype.number(),
    share: faker.datatype.number(),
    favorite: faker.datatype.number(),
    author: {
      name: faker.name.findName(),
      avatarUrl: `/static/mock-images/avatars/avatar_${setIndex}.jpg`,
    },
  };
});

// ----------------------------------------------------------------------

mock.onGet("/api/fundraiser/posts/all").reply(200, { posts });

// ----------------------------------------------------------------------

mock.onGet("/api/fundraiser/posts").reply((config) => {
  try {
    const { index, step } = config.params;
    const maxLength = posts.length;
    const loadMore = index + step;

    const sortPosts = [...posts].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const results = sortPosts.slice(0, loadMore);

    return [200, { results, maxLength }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

// ----------------------------------------------------------------------

mock.onGet("/api/fundraiser/post").reply((config) => {
  try {
    const { title } = config.params;
    const post = posts.find((_post) => paramCase(_post.title) === title);

    if (!post) {
      return [404, { message: "Post not found" }];
    }

    return [200, { post }];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

// ----------------------------------------------------------------------

mock.onGet("/api/fundraiser/posts/recent").reply((config) => {
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

mock.onGet("/api/fundraiser/posts/search").reply((config) => {
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
