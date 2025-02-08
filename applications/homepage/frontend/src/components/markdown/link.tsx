import { component$ } from "@builder.io/qwik"
import type { Link as LinkNode } from "mdast";
import { Child } from "./child";

interface LinkProps {
  node: LinkNode,
  interactive: boolean
}

export const Link = component$<LinkProps>(({ node, interactive }) => {
  if (interactive) {
    return (
      <a href={node.url} class="underline">
        { node.children.map((child, index) => <Child key={index} node={child} interactive={interactive} />) }
      </a>
    )
  } else {
    return (
      <span class="underline">
        { node.children.map((child, index) => <Child key={index} node={child} interactive={interactive} />) }
      </span>
    )
  }
});
