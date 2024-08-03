export async function delay(ms: number) {
    return new Promise((f) => setTimeout(f, ms));
}
