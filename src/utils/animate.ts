import { state } from "../state";
import { delay } from "./delay";

export async function animateSortedBars() {
    const { $bars, delay_ms } = state;

    for (const $bar of $bars.children) {
        $bar.setAttribute("data-type", "sorted");
        await delay(delay_ms / 2);
    }
}
