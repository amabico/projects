import { component$ } from "@builder.io/qwik"
import { Link, routeLoader$, useLocation, type DocumentHead } from "@builder.io/qwik-city"

import NotFound from "~/routes/404"

import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkFrontMatter from "remark-frontmatter"
import type { Yaml } from "mdast"
import { load } from "js-yaml"
import { Markdown } from "~/components/markdown"

import categories from "../../../categories.json"

const articles = import.meta.glob("../../../articles/**/*.md", { query: "?raw" })
const fileNames = Object.keys(articles).map(path => path.split("/")[path.split("/").length - 1]).map(file_name => file_name.split(".md")[0])

export const useDocuments = routeLoader$(async ({ params, status }) => {
  if (!categories.map(category => category.name).includes(params.name)) {
    return status(404)
  }

  const documents = (await Promise.all(Object.values(articles).map(load => load()))).map((document: any) => document.default) as string[]

  const mdasts = await Promise.all(documents.map(document => unified()
    .use(remarkParse)
    .use(remarkFrontMatter)
    .parse(document)
  ))

  return mdasts.map((mdast, index) => {
    const document = documents[index]
    const frontmatter = mdast.children.find(child => child.type === "yaml") as Yaml | undefined
    let title: string | null = null
    let category: string | null = null
    if (frontmatter) {
      const metaValues = load(frontmatter.value) as { title?: string, category?: string }
      title = metaValues.title || null
      category = metaValues.category || null
    }

    return {
      fileName: fileNames[index].split("/")[fileNames[index].split("/").length - 1],
      title,
      category,
      document
    }
  }).filter(documentInfo => documentInfo.category === params.name)
})

export default component$(() => {
  const location = useLocation()
  const documents = useDocuments()
  if (typeof documents.value === "number") return <NotFound />

  const category = categories.find(category => category.name === location.params.name)

  return (
    <div class="my-8 w-full flex justify-center">
      <div class="w-4/6">
        <section class="mt-2 mb-10">
          <h1 class="text-primary text-5xl mb-5">{category?.japanese_name}記事一覧</h1>
          <description class="text-gray-500">素晴らしい{category?.japanese_name}記事の一覧</description>
        </section>
        <ul>
          {documents.value.map(({ fileName, title, document }, index) => (
            <li class="my-2" key={index}>
              <Link href={ `/articles/${fileName}` }>
                <h3 class="text-3xl mb-1 line-clamp-1">{ title || fileName }</h3>
                <div class="line-clamp-3 max-h-22 min-h-22 opacity-70" key={index}><Markdown document={document} /></div>
                <hr class="w-10/12 h-0.5 mx-auto my-4 bg-primary opacity-10 border-1 rounded" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const documents = resolveValue(useDocuments)
  if (typeof documents === "number") {
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
    title: "amabi.co | 随筆記事一覧",
    meta: [
      {
        name: "description",
        content: "awesome articles",
      },
    ]
  }
};
