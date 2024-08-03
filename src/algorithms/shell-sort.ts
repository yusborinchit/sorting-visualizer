import { state } from "../state";
import { delay } from "../utils/delay";
import { getBarValue } from "../utils/get-bar-value";

export async function animateShellSort() {
  const { $bars } = state;
  const draft = Array.from($bars.children);
  await shellSort(draft);
}

async function shellSort(draft: Element[]) {
  const { $bars, delay_ms } = state;

  const n = draft.length;
  let gap = Math.floor(n / 2);

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const aux = getBarValue(draft[i]);

      let j = i;
      while (j >= gap && getBarValue(draft[j - gap]) > aux) {
        [draft[j], draft[j - gap]] = [draft[j - gap], draft[j]];

        draft[j].setAttribute("data-type", "swap");
        draft[j - gap].setAttribute("data-type", "swap");
        $bars.replaceChildren(...draft);

        await delay(delay_ms);

        draft[j].setAttribute("data-type", "");
        draft[j - gap].setAttribute("data-type", "");
        $bars.replaceChildren(...draft);

        j -= gap;
      }
    }

    gap = Math.floor(gap / 2);
  }
}
