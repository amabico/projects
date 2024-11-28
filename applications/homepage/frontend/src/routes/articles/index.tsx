import { component$ } from "@builder.io/qwik"
import type { DocumentHead } from "@builder.io/qwik-city"

const articles = import.meta.glob("../../../articles/*.md", { query: "?raw" })
const articleTitles = Object.keys(articles).map(path => path.split("/")[path.split("/").length - 1]).map(file_name => file_name.split(".md")[0])

export default component$(() => {
  return (
    <div class="p-8">
      <ul>
        {articleTitles.map((title, index) => <li key={index}><a href={"/articles/" + title}>{title}</a></li>)}
      </ul>
    </div>
  );
});

export const head: DocumentHead = {
  title: "amabi.co | articles",
  meta: [
    {
      name: "description",
      content: "awesome articles",
    },
  ],
};
