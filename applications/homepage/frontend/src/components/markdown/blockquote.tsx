import { component$ } from "@builder.io/qwik"
import type { Blockquote as BlockquoteNode } from "mdast";
import { Child } from "./child";

interface BlockquoteProps {
  node: BlockquoteNode,
  interactive: boolean
}

export const Blockquote = component$<BlockquoteProps>(({ node, interactive }) => {
  return (
    <blockquote class="border-s-2 border-primary px-5 opacity-50">
      { node.children.map((child, index) => <Child key={index} node={child} interactive={interactive} />) }
    </blockquote>
  )
});
