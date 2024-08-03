import { createBar } from "../components/bar";
import { state } from "../state";
import { delay } from "../utils/delay";
import { getBarValue } from "../utils/get-bar-value";

export async function animateCountingSort() {
    const { $bars } = state;
    const draft = Array.from($bars.children);
    await countingSort(draft);
}

async function countingSort(draft: Element[]) {
    const { $bars, delay_ms } = state;

    const values = draft.map((bar) => getBarValue(bar));

    const maxVal = Math.max(...values);
    const minVal = Math.min(...values);

    const range = maxVal - minVal + 1;

    const count = new Array(range).fill(0);
    for (const value of values) count[value - minVal]++;

    let index = 0;
    for (let i = 0; i < range; i++) {
        while (count[i] > 0) {
            draft[index] = createBar(i + minVal);

            draft[index].setAttribute("data-type", "swap");
            $bars.replaceChild(draft[index], $bars.children[index]);

            await delay(delay_ms);

            draft[index].setAttribute("data-type", "");
            $bars.replaceChild(draft[index], $bars.children[index]);

            count[i]--;
            index++;
        }
    }
}
