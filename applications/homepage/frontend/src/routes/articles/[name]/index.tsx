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
const fileNames = Object.keys(articles).map(path => path.split("/")[path.split("/").length - 1]).map(file_name => file_name.split(".md")[0])
fileNames.sort().reverse()

export const useDocument = routeLoader$(async ({ params, status }) => {
  const fileIndex = fileNames.findIndex((path: string) => path.includes(params.name))
  if (fileIndex < 0) {
    return status(404)
  }

  const documents = (await Promise.all(Object.values(articles).map(load => load()))).map((document: any) => document.default) as string[]
  documents.sort().reverse()

  const mdasts = await Promise.all(documents.map(document => unified()
    .use(remarkParse)
    .use(remarkFrontMatter)
    .parse(document)
  ))

  const document = documents[fileIndex]
  const mdast = mdasts[fileIndex]

  const previousFilePath = fileIndex === fileNames.length ? null : fileNames[fileIndex + 1]
  const nextFilePath = fileIndex === 0 ? null : fileNames[fileIndex - 1]

  let title = null
  let description = null
  const frontmatter = mdast.children.find(child => child.type === "yaml") as Yaml | undefined
  if (frontmatter) {
    const metaValues = load(frontmatter.value) as { title: string | null, description: string | null }
    title = metaValues.title
    description = metaValues.description
  }

  return {
    title,
    description,
    content: document,
    previous: previousFilePath,
    next: nextFilePath
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
        <div class="mt-10 flex justify-between">
          {
            document.value.previous
            ? <a href={`/articles/${document.value.previous}`}>前の記事</a>
            : <div />
          }
          <a href="/articles">記事一覧</a>
          {
            document.value.next
            ? <a href={`/articles/${document.value.next}`}>次の記事</a>
            : <div />
          }
        </div>
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
        content: document.description ? document.description : "素晴らしい記事",
      },
    ]
  }
};
