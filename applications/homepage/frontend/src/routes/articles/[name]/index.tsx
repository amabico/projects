import { component$ } from "@builder.io/qwik"
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city"

import NotFound from "~/routes/404"

import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkFrontMatter from "remark-frontmatter"
import type { Yaml } from "mdast"
import { load } from "js-yaml"

import { Markdown } from "~/components/markdown"

const articles = import.meta.glob("../../../articles/**/*.md", { query: "?raw" })

export const useDocument = routeLoader$(async ({ params, status }) => {
  const filePath = Object.keys(articles).find((path: string) => path.includes(params.name))
  if (!filePath) {
    return status(404)
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
  const document = useDocument()

  if (typeof document.value === "number") {
    return <NotFound />
  }

  return (
    <div class="my-8 flex justify-center">
      <div class="w-4/6">
        { document.value.title && <h1 class="text-5xl mb-8">{document.value.title}</h1> }
        <Markdown document={document.value.content!} />
      </div>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const document = resolveValue(useDocument)

  if (typeof document === "number") {
    return {
      title: "amabi.co | Not Found",
      meta: [
        {
          name: "description",
          content: "Page not found.",
        },
      ]
    }
  }

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
