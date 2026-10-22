import * as ELEMENT from "./element.js";
export type EventListener<key extends keyof GlobalEventHandlersEventMap> = ELEMENT.EventListener<key>;
export type Events = ELEMENT.Events;
export const addEvents = (events: Events) => ELEMENT.addEvents(document, events);
export const removeEvents = (events: Events) => ELEMENT.removeEvents(document, events);
