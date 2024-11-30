import { component$, useSignal, useVisibleTask$, $, useOnDocument } from "@builder.io/qwik"

export const Sidebar = component$(() => {
  const ref = useSignal<HTMLElement>()
  const hidden = useSignal<boolean>(true)
  const width = useSignal<number>(300)
  const onResize = useSignal<boolean>(false)

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    const newHidden = track(hidden)
    if (newHidden) {
      ref.value!.style.width = "0"
    } else {
      ref.value!.style.width = width.value.toString() + "px"
    }
  })

  const setWidth = $((e: MouseEvent) => {
      if (onResize.value) {
        const cursorX = e.clientX + 5
        ref.value!.style.width = cursorX.toString() + "px"
        width.value = cursorX
      }
  })

  useOnDocument("mousemove", setWidth)

  return (
    <div class="flex">
      <div ref={ref} class={`${ onResize.value || "transition-w duration-500"} w-0 relative  min-h-lvh bg-primary text-white overflow-hidden`}>
        <div
          class="absolute right-0 w-1.5 min-h-lvh cursor-ew-resize"
          onMouseDown$={() => onResize.value = true}
          onMouseUp$={() => onResize.value = false}
        />
        <div class="m-5">
          <h1 class="text-3xl">
            <a href="/">amabi.co</a>
          </h1>
          <nav class="mt-5 -m-5">
            <ul>
              <li class="hover:bg-blue-900">
                <a class="block w-full px-5" href="/articles">articles</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="relative -translate-y-3">
        <button onClick$={() => hidden.value = !hidden.value}>
          <div class={ `absolute transition duration-500 m-2 ${hidden.value ? "rotate-0" : "rotate-180" }` }>
            <div class="border-primary border-t-4 border-r-4 size-3 rotate-45" />
          </div>
        </button>
      </div>
    </div>
  )
});
