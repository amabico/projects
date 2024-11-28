import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <section>
        <div class="flex justify-center">
          <div class="flex flex-col items-center">
            <img src="images/amabie.png" height={50} width={200} />
            <div class="text-center text-gray-300 text-xs">『肥後国海中の怪(アマビエの図)』（京都大学附属図書館所蔵）</div>
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "amabi.co",
  meta: [
    {
      name: "description",
      content: "Ecce, Homo?",
    },
  ],
};
