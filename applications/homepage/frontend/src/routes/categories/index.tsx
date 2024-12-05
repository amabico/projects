import { component$ } from "@builder.io/qwik"
import { Link, type DocumentHead } from "@builder.io/qwik-city"

import categories from "../../categories.json"

export default component$(() => {
  return (
    <div class="my-8 w-full flex justify-center">
      <div class="w-4/6">
        <section class="mt-2 mb-10">
          <h1 class="text-primary text-5xl mb-5">カテゴリー一覧</h1>
          <description class="text-gray-500">素晴らしいカテゴリーの一覧</description>
        </section>
        <ul>
          {categories.map(({ name, japanese_name, japanese_description }, index) => (
            <li class="my-2" key={index}>
              <Link href={ `/categories/${name}` }>
                <h3 class="text-3xl mb-1 line-clamp-1">{ japanese_name }</h3>
                <div class="line-clamp-3 max-h-22 min-h-22 opacity-70" key={index}>{ japanese_description }</div>
                <hr class="w-10/12 h-0.5 mx-auto my-4 bg-primary opacity-10 border-1 rounded" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
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
