import { state } from "../state";

function mapRange(value: number) {
    const { bars_length } = state;
    return 1 + ((value - 1) * (100 - 1)) / (bars_length - 1);
}

export function createBar(value: number) {
    const bar = document.createElement("div");

    bar.style.height = `${mapRange(value)}%`;
    bar.setAttribute("data-value", String(value));
    bar.className =
        "flex-1 bg-neutral data-[type=sorted]:bg-success data-[type=swap]:bg-primary";

    return bar;
}
