import { component$ } from "@builder.io/qwik"
import type { Text as TextNode } from "mdast";

interface TextProps {
  node: TextNode
}

export const Text = component$<TextProps>(({ node }) => {
  return node.value
});
