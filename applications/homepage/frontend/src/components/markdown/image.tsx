import { component$ } from "@builder.io/qwik"
import type { Image as ImageNode } from "mdast"

interface ImageProps {
  node: ImageNode
}

export const Image = component$<ImageProps>(({ node }) => {
  return (
    <div class="flex flex-col items-center my-5">
      <img class="w-10/12" src={`/images/${node.url}`} width={10000} height={undefined} alt={node.alt || ""} />
      { node.alt && <div class="flex justify-center text-gray-500">{node.alt}</div> }
    </div>
  );
});
