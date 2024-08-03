import { state } from "../state";
import { delay } from "../utils/delay";
import { getBarValue } from "../utils/get-bar-value";

export async function animateQuickSort() {
    const { $bars } = state;
    const draft = Array.from($bars.children);
    await quickSort(draft, 0, draft.length - 1);
}

async function quickSort(draft: Element[], low: number, high: number) {
    if (low < high) {
        const pivot = await partition(draft, low, high);

        await Promise.all([
            quickSort(draft, low, pivot - 1),
            quickSort(draft, pivot + 1, high),
        ]);
    }
}

async function partition(draft: Element[], low: number, high: number) {
    const { $bars, delay_ms } = state;

    const pivotValue = getBarValue(draft[high]);

    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        const currentValue = getBarValue(draft[j]);

        if (currentValue < pivotValue) {
            i++;
            [draft[i], draft[j]] = [draft[j], draft[i]];

            draft[i].setAttribute("data-type", "swap");
            draft[j].setAttribute("data-type", "swap");
            $bars.replaceChildren(...draft);

            await delay(delay_ms);

            draft[i].setAttribute("data-type", "");
            draft[j].setAttribute("data-type", "");
            $bars.replaceChildren(...draft);
        }
    }

    [draft[i + 1], draft[high]] = [draft[high], draft[i + 1]];

    draft[i + 1].setAttribute("data-type", "");
    draft[high].setAttribute("data-type", "");
    $bars.replaceChildren(...draft);

    await delay(delay_ms);

    draft[i + 1].setAttribute("data-type", "");
    draft[high].setAttribute("data-type", "");
    $bars.replaceChildren(...draft);

    return i + 1;
}
