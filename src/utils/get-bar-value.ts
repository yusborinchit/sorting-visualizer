export function getBarValue(bar: Element) {
    return Number(bar.getAttribute("data-value")!);
}
