import { component$, useSignal, useTask$ } from "@builder.io/qwik"

import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkMath from "remark-math"
import remarkGfm from "remark-gfm"
import remarkFrontMatter from "remark-frontmatter"

import type { Root } from "mdast"
import { Child } from "./child";

interface MarkdownProps {
  document: string,
  interactive?: boolean
}

export const Markdown = component$<MarkdownProps>(({ document, interactive = true }) => {
  const mdast = useSignal<Root>({ type: "root", children: [] })

  useTask$(async () => {
    mdast.value = await unified()
      .use(remarkParse)
      .use(remarkMath)
      .use(remarkGfm)
      .use(remarkFrontMatter)
      .parse(document)
  })

  return (
    <>
      { mdast.value.children.map((child, index) => <Child node={child} interactive={interactive} key={index} />) }
    </>
  );
});
