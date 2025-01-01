import { component$ } from "@builder.io/qwik"
import type { List as ListNode } from "mdast"
import { Child } from "./child";

interface ListProps {
  node: ListNode
}

export const List = component$<ListProps>(({ node }) => {
  return node.ordered ? (
    <ol>{ node.children.map((child, index) => <Child node={child} key={index} /> ) }</ol>
  ) : (
    <ul>{ node.children.map((child, index) => <Child node={child} key={index} /> ) }</ul>
  );
});
