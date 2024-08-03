import { createBar } from "../components/bar";
import { state } from "../state";
import { delay } from "../utils/delay";
import { getBarValue } from "../utils/get-bar-value";

export async function animateMergeSort() {
    const { $bars } = state;
    const draft = Array.from($bars.children);
    await mergeSort(draft, 0, draft.length);
}

async function mergeSort(draft: Element[], start: number, end: number) {
    if (end - start <= 1) return draft.slice(start, end);

    const middle = Math.floor((start + end) / 2);

    const [left_sorted, right_sorted] = await Promise.all([
        mergeSort(draft, start, middle),
        mergeSort(draft, middle, end),
    ]);

    const sorted = await merge(left_sorted, right_sorted, start);

    return sorted;
}

async function merge(left: Element[], right: Element[], start: number) {
    const { $bars, delay_ms } = state;

    const result = [];
    let left_index = 0;
    let right_index = 0;

    while (left_index < left.length && right_index < right.length) {
        const left_value = getBarValue(left[left_index]);
        const right_value = getBarValue(right[right_index]);

        if (left_value < right_value) {
            result.push(createBar(left_value));
            left_index++;
        } else {
            result.push(createBar(right_value));
            right_index++;
        }
    }

    while (left_index < left.length) {
        const left_value = getBarValue(left[left_index]);
        result.push(createBar(left_value));
        left_index++;
    }

    while (right_index < right.length) {
        const right_value = getBarValue(right[right_index]);
        result.push(createBar(right_value));
        right_index++;
    }

    for (let i = 0; i < result.length; i++) {
        result[i].setAttribute("data-type", "swap");
        $bars.children[start + i].setAttribute("data-type", "swap");
        $bars.replaceChild(result[i], $bars.children[start + i]);

        await delay(delay_ms);

        result[i].setAttribute("data-type", "");
        $bars.children[start + i].setAttribute("data-type", "");
        $bars.replaceChild(result[i], $bars.children[start + i]);
    }

    return result;
}
