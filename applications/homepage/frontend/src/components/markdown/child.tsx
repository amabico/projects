import { component$ } from "@builder.io/qwik"
import type { RootContent } from "mdast"

import { Code } from "./code";
import { Heading } from "./heading";
import { Text } from "./text";
import { Paragraph } from "./paragraph";
import { InlineMath } from "./inlineMath";
import { FootnoteReference } from "./footnote-reference";
import { FootnoteDefinition } from "./footnote-definition";
import { List } from "./list";
import { ListItem } from "./listItem";
import { Image } from "./image";

interface ChildProps {
  node: RootContent,
  exclude?: "paragraph"[]
}

export const Child = component$<ChildProps>(({ node, exclude }) => {
  switch(node.type) {
    case "paragraph":
      if (exclude && exclude.includes("paragraph")) return node.children.map((child, index) => <Child node={child} key={index} />)
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
    case "list":
      return <List node={node} />
    case "listItem":
      return <ListItem node={node} />
    case "footnoteReference":
      return <FootnoteReference node={node} />
    case "footnoteDefinition":
      return <FootnoteDefinition node={node} />
    case "image":
      return <Image node={node} />
    default:
      return JSON.stringify(node)
  }
});
