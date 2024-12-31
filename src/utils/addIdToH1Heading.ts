import { PAGE_TITLE_ID } from "../constants";
import { visit } from "unist-util-visit";

function addIdToH1Headings() {
  return (tree: any) => {
    visit(tree, "heading", (node) => {
      if (node.depth === 1) {
        // Only target level 1 headings
        if (!node.data) node.data = {};
        if (!node.data.hProperties) node.data.hProperties = {};
        node.data.hProperties.id = PAGE_TITLE_ID;
      }
    });
  };
}

export default addIdToH1Headings;
