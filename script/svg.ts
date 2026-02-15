import * as ELEMENT from "./element.js";
export type Tag = ELEMENT.SvgTag;
export const setAttributes = ELEMENT.setAttributes;
export const makeSelector = ELEMENT.makeSelector;
export const makeElement = <T extends Tag>(tag: T): SVGElementTagNameMap[T] =>
    document.createElementNS("http://www.w3.org/2000/svg", tag);
export const make = <T extends Tag>(source: { tag: T } & { [key: string]: string | number; }): SVGElementTagNameMap[T] =>
    setAttributes(makeElement(source.tag), source);
export const makeSure = <T extends Tag>(parent: Element, source: { tag: T } & { [key: string]: string | number; }): SVGElementTagNameMap[T] =>
    parent.querySelector<SVGElementTagNameMap[T]>(makeSelector(source)) ??
    parent.appendChild(make(source));
