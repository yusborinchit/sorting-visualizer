import { animateBubbleSort } from "./algorithms/bubble-sort";
import { animateCountingSort } from "./algorithms/counting-sort";
import { animateHeapSort } from "./algorithms/heap-sort";
import { animateInsertionSort } from "./algorithms/insertion-sort";
import { animateMergeSort } from "./algorithms/merge-sort";
import { animateQuickSort } from "./algorithms/quick-sort";
import { animateShellSort } from "./algorithms/shell-sort";
import { createListOfBars } from "./components/list-of-bars";
import { state } from "./state";
import { animateSortedBars } from "./utils/animate";

document.addEventListener("DOMContentLoaded", () => {
    createListOfBars();

    const {
        $range_length,
        $range_speed,
        $select_algorithm,
        $button_generate,
        $button_sort,
    } = state;

    $range_length.addEventListener("change", () => {
        $range_length.previousElementSibling!.textContent = `Array Length: (${$range_length.value})`;
        state.bars_length = Number($range_length.value);
        $button_generate.click();
    });

    $range_speed.addEventListener("change", () => {
        $range_speed.previousElementSibling!.textContent = `Sorting Speed: (${$range_speed.value}ms)`;
        state.delay_ms = Number($range_speed.value);
    });

    $button_generate.addEventListener("click", () => {
        createListOfBars();

        $range_length.disabled = false;
        $range_speed.disabled = false;
        $select_algorithm.disabled = false;
        $button_generate.disabled = false;
        $button_sort.disabled = false;
    });

    $button_sort.addEventListener("click", async () => {
        const algorithm = $select_algorithm.value;

        const algorithm_animations: Record<string, () => Promise<void>> = {
            bubble: animateBubbleSort,
            merge: animateMergeSort,
            quick: animateQuickSort,
            insertion: animateInsertionSort,
            heap: animateHeapSort,
            counting: animateCountingSort,
            shell: animateShellSort,
        };

        $range_length.disabled = true;
        $range_speed.disabled = true;
        $select_algorithm.disabled = true;
        $button_generate.disabled = true;
        $button_sort.disabled = true;

        await algorithm_animations[algorithm]();
        await animateSortedBars();

        $range_length.disabled = false;
        $range_speed.disabled = false;
        $select_algorithm.disabled = true;
        $button_generate.disabled = false;
        $button_sort.disabled = true;
    });
});
