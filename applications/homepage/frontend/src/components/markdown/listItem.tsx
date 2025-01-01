import { component$ } from "@builder.io/qwik"
import type { ListItem as ListItemNode } from "mdast"
import { Child } from "./child";

interface ListItemProps {
  node: ListItemNode
}

export const ListItem = component$<ListItemProps>(({ node }) => {
  return (
    <li>{ node.children.map((child, index) => <Child node={child} exclude={["paragraph"]} key={index} />) }</li>
  )
});
