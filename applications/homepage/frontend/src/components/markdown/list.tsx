import { component$ } from "@builder.io/qwik"
import type { List as ListNode } from "mdast"
import { Child } from "./child";

interface ListProps {
  node: ListNode,
  interactive: boolean
}

export const List = component$<ListProps>(({ node, interactive }) => {
  return node.ordered ? (
    <ol class="list-inside list-decimal">{ node.children.map((child, index) => <Child node={child} interactive={interactive} key={index} /> ) }</ol>
  ) : (
    <ul class="list-inside list-disc">{ node.children.map((child, index) => <Child node={child} interactive={interactive} key={index} /> ) }</ul>
  );
});
