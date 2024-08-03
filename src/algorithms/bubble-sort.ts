import { state } from "../state";
import { delay } from "../utils/delay";
import { getBarValue } from "../utils/get-bar-value";

export async function animateBubbleSort() {
    const { $bars, delay_ms } = state;

    const draft = Array.from($bars.children);

    for (let i = 0; i < draft.length; i++) {
        for (let j = 0; j < draft.length - i - 1; j++) {
            const value1 = getBarValue(draft[j]);
            const value2 = getBarValue(draft[j + 1]);

            if (value1 > value2) {
                [draft[j], draft[j + 1]] = [draft[j + 1], draft[j]];

                draft[j].setAttribute("data-type", "swap");
                draft[j + 1].setAttribute("data-type", "swap");
                $bars.replaceChildren(...draft);

                await delay(delay_ms);

                draft[j].setAttribute("data-type", "");
                draft[j + 1].setAttribute("data-type", "");
                $bars.replaceChildren(...draft);
            }
        }
    }
}
