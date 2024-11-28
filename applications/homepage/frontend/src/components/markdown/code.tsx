import { component$, useSignal, useTask$ } from "@builder.io/qwik"
import type { Code as CodeNode } from "mdast";
import { codeToHtml } from "shiki";

interface CodeProps {
  node: CodeNode
}

export const Code = component$<CodeProps>(({ node }) => {
  const html = useSignal<string>()

  useTask$(async () => {
    html.value =  await codeToHtml(node.value, { lang: node.lang || "shell", theme: "nord" })
  })
  return (
    <span dangerouslySetInnerHTML={html.value} />
  );
});
