import { $ } from "./utils/$";

export const state = {
    // Config
    bars_length: 130,
    delay_ms: 10,

    // Dom Elements
    $notification: $<HTMLDivElement>("notification"),
    $notification_time: $<HTMLSpanElement>("notification-time"),
    $bars: $<HTMLDivElement>("bars"),
    $range_length: $<HTMLInputElement>("range-length"),
    $range_speed: $<HTMLInputElement>("range-speed"),
    $select_algorithm: $<HTMLSelectElement>("select-algorithm"),
    $button_generate: $<HTMLButtonElement>("btn-generate"),
    $button_sort: $<HTMLButtonElement>("btn-sort"),
};
