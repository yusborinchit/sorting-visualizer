export function $<T extends HTMLElement>(id: string): T {
  return document.getElementById(id) as T;
}
