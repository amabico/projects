import { component$ } from "@builder.io/qwik"
import type { InlineMath as InlineMathNode } from "mdast-util-math"
import katex from "katex"

interface InlineMathProps {
  node: InlineMathNode
}

export const InlineMath = component$<InlineMathProps>(({ node }) => {
  const html = katex.renderToString(node.value, { throwOnError: false })

  return (
    <span dangerouslySetInnerHTML={html} />
  );
});
