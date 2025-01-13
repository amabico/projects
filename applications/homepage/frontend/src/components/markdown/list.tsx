import { component$ } from "@builder.io/qwik"
import type { List as ListNode } from "mdast"
import { Child } from "./child";

interface ListProps {
  node: ListNode,
  interactive: boolean
}

export const List = component$<ListProps>(({ node, interactive }) => {
  return node.ordered ? (
    <ol>{ node.children.map((child, index) => <Child node={child} interactive={interactive} key={index} /> ) }</ol>
  ) : (
    <ul>{ node.children.map((child, index) => <Child node={child} interactive={interactive} key={index} /> ) }</ul>
  );
});
