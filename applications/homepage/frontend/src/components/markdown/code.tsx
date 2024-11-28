import { component$, useSignal, useTask$ } from "@builder.io/qwik"
import type { Code as CodeNode } from "mdast";
import { createHighlighterCore } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"
import nord from "shiki/themes/nord.mjs"
import rust from "shiki/langs/rust.mjs"

interface CodeProps {
  node: CodeNode
}

export const Code = component$<CodeProps>(({ node }) => {
  const html = useSignal<string>()

  useTask$(async () => {
    const highlighter = await createHighlighterCore({
      themes: [nord],
      langs: [rust],
      engine: createJavaScriptRegexEngine()
    })

    html.value =  await highlighter.codeToHtml(node.value, { lang: node.lang || "shell", theme: "nord" })
  })
  return (
    <span dangerouslySetInnerHTML={html.value} />
  );
});
