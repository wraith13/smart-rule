import * as ELEMENT from "./element.js";
export type Tag = ELEMENT.HtmlTag;
export const setAttributes = ELEMENT.setAttributes;
export const makeSelector = ELEMENT.makeSelector;
export const makeElement = <T extends Tag>(tag: T): HTMLElementTagNameMap[T] =>
    document.createElement(tag);
export const make = <T extends Tag>(source: { tag: T } & { [key: string]: string | number; }): HTMLElementTagNameMap[T] =>
    setAttributes(makeElement(source.tag), source);
export const makeSure = <T extends Tag>(parent: Element, source: { tag: T } & { [key: string]: string | number; }): HTMLElementTagNameMap[T] =>
    parent.querySelector<HTMLElementTagNameMap[T]>(makeSelector(source)) ??
    parent.appendChild(make(source));
