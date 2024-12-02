import { component$ } from "@builder.io/qwik"
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city"

import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkFrontMatter from "remark-frontmatter"
import type { Yaml } from "mdast"
import { load } from "js-yaml"

import { Markdown } from "~/components/markdown"

const articles = import.meta.glob("../../../articles/**/*.md", { query: "?raw" })

export const useDocument = routeLoader$(async ({ params, send }) => {
  const filePath = Object.keys(articles).find((path: string) => path.includes(params.name))
  if (!filePath) {
    const response = await fetch(new URL("/404"))
    send(response)
  }

  const document = (await articles[filePath!]() as any).default as string
  const mdast = await unified()
    .use(remarkParse)
    .use(remarkFrontMatter)
    .parse(document)

  let title = null
  const frontmatter = mdast.children.find(child => child.type === "yaml") as Yaml | undefined
  if (frontmatter) {
    const metaValues = load(frontmatter.value) as { title?: string }
    title = metaValues.title
  }

  return {
    title,
    content: document
  }
})

export default component$(() => {
  const document = useDocument();

  return (
    <div class="my-8 flex justify-center">
      <div class="w-4/6">
        { document.value.title && <h1 class="text-5xl mb-4">{document.value.title}</h1> }
        <Markdown document={document.value.content!} />
      </div>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const document = resolveValue(useDocument)

  return {
    title: document.title ? `amabi.co | ${document.title}` : "amabi.co",
    meta: [
      {
        name: "description",
        content: "awesome articles",
      },
    ]
  }
};
