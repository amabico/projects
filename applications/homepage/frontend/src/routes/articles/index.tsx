import { component$ } from "@builder.io/qwik"
import { Link, type DocumentHead } from "@builder.io/qwik-city"

const articles = import.meta.glob("../../../articles/*.md", { query: "?raw" })
const articleTitles = Object.keys(articles).map(path => path.split("/")[path.split("/").length - 1]).map(file_name => file_name.split(".md")[0])

export default component$(() => {
  return (
    <div class="py-8 px-16">
      <ul>
        {articleTitles.map((title, index) => <li key={index}><Link href={"/articles/" + title}>{title}</Link></li>)}
      </ul>
    </div>
  );
});

export const head: DocumentHead = {
  title: "amabi.co | 記事一覧",
  meta: [
    {
      name: "description",
      content: "awesome articles",
    },
  ],
};
