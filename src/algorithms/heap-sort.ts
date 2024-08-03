import { state } from "../state";
import { delay } from "../utils/delay";
import { getBarValue } from "../utils/get-bar-value";

export async function animateHeapSort() {
    const { $bars } = state;
    const draft = Array.from($bars.children);
    await heapSort(draft, draft.length);
}

export async function heapSort(draft: Element[], n: number) {
    const { $bars, delay_ms } = state;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(draft, n, i);

    for (let i = n - 1; i > 0; i--) {
        [draft[0], draft[i]] = [draft[i], draft[0]];

        draft[0].setAttribute("data-type", "swap");
        draft[i].setAttribute("data-type", "swap");
        $bars.replaceChildren(...draft);

        await delay(delay_ms);

        draft[0].setAttribute("data-type", "");
        draft[i].setAttribute("data-type", "");
        $bars.replaceChildren(...draft);

        await heapify(draft, i, 0);
    }
}

async function heapify(draft: Element[], n: number, i: number) {
    const { $bars, delay_ms } = state;

    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && getBarValue(draft[left]) > getBarValue(draft[largest]))
        largest = left;

    if (right < n && getBarValue(draft[right]) > getBarValue(draft[largest]))
        largest = right;

    if (largest !== i) {
        [draft[i], draft[largest]] = [draft[largest], draft[i]];

        draft[i].setAttribute("data-type", "swap");
        draft[largest].setAttribute("data-type", "swap");
        $bars.replaceChildren(...draft);

        await delay(delay_ms);

        draft[i].setAttribute("data-type", "");
        draft[largest].setAttribute("data-type", "");
        $bars.replaceChildren(...draft);

        await heapify(draft, n, largest);
    }
}
