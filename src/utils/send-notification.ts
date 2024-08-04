import { state } from "../state";
import { delay } from "./delay";

export async function sendNotification(time: number) {
    const { $notification, $notification_time } = state;

    $notification.setAttribute("data-show", "true");
    $notification_time.textContent = time.toFixed(2);

    await delay(3000);
    $notification.setAttribute("data-show", "false");

    await delay(250);
    $notification.setAttribute("data-show", "");
}
