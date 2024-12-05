import { component$ } from "@builder.io/qwik"
import type { FootnoteDefinition as FootnoteDefinitionNode } from "mdast";
import { Child } from "./child";

interface HeadingProps {
  node: FootnoteDefinitionNode
}

export const FootnoteDefinition = component$<HeadingProps>(({ node }) => {
  return (
    <div class="flex">
      <span class="mr-2">{node.label}:</span>
      <span>{ node.children.map((child, index) => <Child key={index} node={child} exclude={["paragraph"]} />) }</span>
    </div>
  )
});
