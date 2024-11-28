import { component$ } from "@builder.io/qwik"
import type { RootContent } from "mdast"

import { Code } from "./code";
import { Heading } from "./heading";
import { Text } from "./text";
import { Paragraph } from "./paragraph";
import { InlineMath } from "./inlineMath";

interface ChildProps {
  node: RootContent
}

export const Child = component$<ChildProps>(({ node }) => {
  switch(node.type) {
    case "paragraph":
      return <Paragraph node={node}/>
    case "heading":
      return <Heading node={node}/>
    case "text":
      return <Text node={node}/>
    case "code":
      return <Code node={node}/>
    case "inlineMath":
      return <InlineMath node={node} />
    case "yaml":
      return null
    default:
      return JSON.stringify(node)
  }
});
