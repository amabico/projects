import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city";
import type { FootnoteReference as FootnoteReferenceNode } from "mdast";

interface HeadingProps {
  node: FootnoteReferenceNode
}

export const FootnoteReference = component$<HeadingProps>(({ node }) => {
  return (
    <sup class="text-gray-400">
      <Link href={`#${node.identifier}`}>[{node.label}]</Link>
    </sup>
  )
});
