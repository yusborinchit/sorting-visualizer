import { state } from "../state";
import { createBar } from "./bar";

export function createListOfBars() {
    const { $bars, bars_length } = state;

    const possibles = Array.from({ length: bars_length }, (_, i) => i + 1);
    for (let i = possibles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [possibles[i], possibles[j]] = [possibles[j], possibles[i]];
    }

    $bars.replaceChildren(...possibles.map((value) => createBar(value)));
}
