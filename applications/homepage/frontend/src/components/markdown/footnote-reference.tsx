import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city";
import type { FootnoteReference as FootnoteReferenceNode } from "mdast";

interface HeadingProps {
  node: FootnoteReferenceNode,
  interactive: boolean
}

export const FootnoteReference = component$<HeadingProps>(({ node, interactive }) => {
  return (
    <sup class="text-gray-400">
      { interactive ? <Link href={`#${node.identifier}`}>[{node.label}]</Link> : <span>[{node.label}]</span> }
    </sup>
  )
});
