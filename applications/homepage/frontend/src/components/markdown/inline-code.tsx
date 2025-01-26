import { component$ } from "@builder.io/qwik"
import type { InlineCode as InlineCodeNode } from "mdast";

interface InlineCodeProps {
  node: InlineCodeNode
}

export const InlineCode = component$<InlineCodeProps>(({ node }) => {
  return (
    <code class="break-all">{ node.value }</code>
  );
});
