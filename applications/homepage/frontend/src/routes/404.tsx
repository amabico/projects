import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import Amabie from "../images/amabie.png?h=400&w=200&jsx"

export default component$(() => {
  return (
    <>
      <div class="h-full flex flex-col">
        <div class="flex justify-center mt-auto mb-auto">
          <div class="flex flex-col items-center relative">
            <h1 class="text-center text-3xl text-primary">ページが見つかりませんでした</h1>
            <Amabie />
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "amabi.co | Not Found",
  meta: [
    {
      name: "description",
      content: "Page not found.",
    },
  ],
};
