import { component$ } from "@builder.io/qwik"
import type { ListItem as ListItemNode } from "mdast"
import { Child } from "./child";

interface ListItemProps {
  node: ListItemNode,
  interactive: boolean
}

export const ListItem = component$<ListItemProps>(({ node, interactive }) => {
  return (
    <li>{ node.children.map((child, index) => <Child node={child} interactive={interactive} exclude={["paragraph"]} key={index} />) }</li>
  )
});
