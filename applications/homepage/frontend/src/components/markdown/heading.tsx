import { component$ } from "@builder.io/qwik"
import type { Heading as HeadingNode } from "mdast";
import { Child } from "./child";

interface HeadingProps {
  node: HeadingNode,
  interactive: boolean
}

export const Heading = component$<HeadingProps>(({ node, interactive }) => {
  switch(node.depth) {
    case 1: return <h1 class="my-3 text-5xl">{node.children.map((child, index) => <Child node={child} interactive={interactive} key={index}/>)}</h1>
    case 2: return <h2 class="my-3 text-4xl">{node.children.map((child, index) => <Child node={child} interactive={interactive} key={index}/>)}</h2>
    case 3: return <h3 class="my-3 text-3xl">{node.children.map((child, index) => <Child node={child} interactive={interactive} key={index}/>)}</h3>
    case 4: return <h4 class="my-3 text-2xl">{node.children.map((child, index) => <Child node={child} interactive={interactive} key={index}/>)}</h4>
    case 5: return <h5 class="my-3 text-xl">{node.children.map((child, index) => <Child node={child} interactive={interactive} key={index}/>)}</h5>
    case 6: return <h6>{node.children.map((child, index) => <Child node={child} interactive={interactive} key={index}/>)}</h6>
  }
});
