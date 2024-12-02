import { component$ } from "@builder.io/qwik"
import type { Paragraph as ParagraphNode } from "mdast";
import { Child } from "./child";

interface ParagraphProps {
  node: ParagraphNode
}

export const Paragraph = component$<ParagraphProps>(({ node }) => {
  return <div class="my-4">{node.children.map((child, index) => <Child node={child} key={index} />)}</div>
})