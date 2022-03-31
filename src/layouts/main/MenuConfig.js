import { Icon } from "@iconify/react";
import homeFill from "@iconify/icons-eva/home-fill";
import fileFill from "@iconify/icons-eva/file-fill";
import roundGrain from "@iconify/icons-ic/round-grain";
import bookOpenFill from "@iconify/icons-eva/book-open-fill";
import featureOpenFill from "@iconify/icons-eva/file-add-outline";
import { paramCase } from "change-case";
import _ from "lodash";
// routes
import {
  PATH_AUTH,
  PATH_DOCS,
  PATH_PAGE,
  PATH_DASHBOARD,
} from "../../routes/paths";
import { CATEGORIES } from "../../utils/constants";

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

let categories = [];
_.orderBy(CATEGORIES, [(item) => item.toLowerCase()], ["asc"]).map((category) =>
  categories.push({
    title: category,
    path: PATH_PAGE.fundraise,
    type: 0,
    category: category,
  })
);

const menuConfig = [
  {
    title: "Home",
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: "/",
  },
  // {
  //   title: "Fundraise for",
  //   path: "/Features",
  //   icon: <Icon icon={featureOpenFill} {...ICON_SIZE} />,
  //   children: [
  //     {
  //       subheader: "Fundraise for",
  //       items: categories,
  //     },
  //   ],
  // },
];

export default menuConfig;
