import { state } from "../state";
import { delay } from "../utils/delay";
import { getBarValue } from "../utils/get-bar-value";

export async function animateInsertionSort() {
    const { $bars, delay_ms } = state;

    const draft = Array.from($bars.children);

    for (let i = 1; i < draft.length; i++) {
        const currentBar = draft[i];
        const currentValue = getBarValue(currentBar);

        let j = i - 1;

        while (j >= 0 && getBarValue(draft[j]) > currentValue) {
            draft[j + 1] = draft[j];

            draft[j].setAttribute("data-type", "swap");
            draft[j + 1].setAttribute("data-type", "swap");
            $bars.replaceChildren(...draft);

            await delay(delay_ms);

            draft[j].setAttribute("data-type", "");
            draft[j + 1].setAttribute("data-type", "");
            $bars.replaceChildren(...draft);

            j--;
        }

        draft[j + 1] = currentBar;

        draft[j + 1].setAttribute("data-type", "swap");
        currentBar.setAttribute("data-type", "swap");
        $bars.replaceChildren(...draft);

        await delay(delay_ms);

        draft[j + 1].setAttribute("data-type", "");
        currentBar.setAttribute("data-type", "");
        $bars.replaceChildren(...draft);
    }
}
