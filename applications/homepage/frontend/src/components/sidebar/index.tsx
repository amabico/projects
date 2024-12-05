import { component$, useSignal, useVisibleTask$, $, useOnDocument } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city";
import AmabieEye from "../../../public/favicon.png?w=36&h=36&jsx"

export const Sidebar = component$(() => {
  const ref = useSignal<HTMLElement>()
  const dummyRef = useSignal<HTMLElement>()
  const hidden = useSignal<boolean>(false)
  const width = useSignal<number>(300)
  const onResize = useSignal<boolean>(false)

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    const newHidden = track(hidden)
    if (newHidden) {
      ref.value!.style.width = "0"
      dummyRef.value!.style.width = "0"
    } else {
      ref.value!.style.width = width.value.toString() + "px"
      dummyRef.value!.style.width = width.value.toString() + "px"
    }
  })

  const setWidth = $((e: MouseEvent) => {
      if (onResize.value) {
        const cursorX = e.clientX + 5
        ref.value!.style.width = cursorX.toString() + "px"
        dummyRef.value!.style.width = cursorX.toString() + "px"
        width.value = cursorX
      }
  })

  useOnDocument("mousemove", setWidth)

  return (
    <>
      <div ref={dummyRef} class={`${ onResize.value || "transition-w duration-500"} shrink-0 w-0 min-h-lvh`} />
      <div class="flex fixed">
        <div ref={ref} class={`${ onResize.value || "transition-w duration-500"} w-0 relative  min-h-lvh bg-primary text-white overflow-hidden`}>
          <div
            class="absolute right-0 w-1.5 min-h-lvh cursor-ew-resize"
            onMouseDown$={() => onResize.value = true}
            onMouseUp$={() => onResize.value = false}
          />
          <div class="mx-5 h-full flex flex-col">
            <Link href="/" class="flex justify-center items-center">
              <div class="invert pt-5">
                <AmabieEye />
              </div>
            </Link>
            <nav class="flex flex-col grow pt-10 -mx-5">
              <h3 class="text-center text-xl">お品書き</h3>
              <ul class="mt-5 grow">
                <li class="hover:bg-blue-900">
                  <Link class="block w-full px-5 text-center p-3" href="/articles">記事一覧</Link>
                </li>
                <li class="hover:bg-blue-900">
                  <Link class="block w-full px-5 text-center p-3" href="/categories">カテゴリー</Link>
                </li>
              </ul>
              <ul class="mt-auto my-5">
                <li class="hover:bg-blue-900">
                  <Link class="block w-full px-5 text-center p-3" href="/about">このページについて</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="relative translate-y-5">
          <button onClick$={() => hidden.value = !hidden.value} class="transition duration-500 hover:scale-125 hover:-translate-y-1">
            <div class={ `transition duration-500 absolute m-2 ${ hidden.value ? "rotate-0" : "rotate-180" }` }>
              <div class="rotate-90 ">
                <div class="rotate-45">
                  <div class="border-primary border-2 size-4">
                    <div class="size-2 bg-primary"></div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  )
});
