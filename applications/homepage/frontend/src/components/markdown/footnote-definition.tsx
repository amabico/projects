import { component$ } from "@builder.io/qwik"
import type { FootnoteDefinition as FootnoteDefinitionNode } from "mdast";
import { Child } from "./child";

interface FootnoteDefinitionProps {
  node: FootnoteDefinitionNode,
  interactive: boolean
}

export const FootnoteDefinition = component$<FootnoteDefinitionProps>(({ node, interactive }) => {
  return (
    <div id={node.identifier} class="flex">
      <span class="mr-2">{node.label}:</span>
      <span>{ node.children.map((child, index) => <Child key={index} node={child} interactive={interactive} exclude={["paragraph"]} />) }</span>
    </div>
  )
});
