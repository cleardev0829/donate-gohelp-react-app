import { Icon } from "@iconify/react";
import homeFill from "@iconify/icons-eva/home-fill";
import fileFill from "@iconify/icons-eva/file-fill";
import roundGrain from "@iconify/icons-ic/round-grain";
import bookOpenFill from "@iconify/icons-eva/book-open-fill";
import featureOpenFill from "@iconify/icons-eva/file-add-outline";
// routes
import {
  PATH_AUTH,
  PATH_DOCS,
  PATH_PAGE,
  PATH_DASHBOARD,
} from "../../routes/paths";

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: "Home",
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: "/",
  },
  {
    title: "Fundraise for",
    path: "/Features",
    icon: <Icon icon={featureOpenFill} {...ICON_SIZE} />,
    children: [
      // {
      //   subheader: "Fundraise for",
      //   items: [
      //     {
      //       title: "Recruitment Solution",
      //       path: PATH_PAGE.recruitmentSolution,
      //     },
      //     { title: "Resume Parsing", path: PATH_PAGE.resumeParsing },
      //     { title: "Candidate Sourcing", path: PATH_PAGE.candidateSourcing },
      //     { title: "Rekommendation", path: PATH_PAGE.rekommendation },
      //   ],
      // },
    ],
  },
];

export default menuConfig;
