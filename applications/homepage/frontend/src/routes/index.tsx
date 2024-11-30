import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Amabie from "../../public/images/amabie.png?h=400&w=200&jsx"

export default component$(() => {
  return (
    <>
      <div class="h-full flex flex-col">
        <div class="flex justify-center mt-auto mb-auto">
          <div class="flex flex-col items-center relative">
            <h1 class="text-center text-3xl text-primary">Amabi.coへようこそ</h1>
            <Amabie />
          </div>
        </div>
        <div class="mt-auto mb-5 text-center text-gray-400 text-xs">当サイトで利用されているアマビエ/アマビコ画像は、『肥後国海中の怪(アマビエの図)』（京都大学附属図書館所蔵）を加工したものです。</div>
      </div>
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
