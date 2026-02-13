export type SvgTag = keyof SVGElementTagNameMap;
export const setAttributes = <T extends SVGElement>(element: T, attributes: { [key: string]: string | number; }): T =>
{
    for(const [key, value] of Object.entries(attributes))
    {
        switch(key)
        {
        case "tag":
            // Ignore
            break;
        case "textContent":
            element.textContent = value.toString();
            break;
        default:
            element.setAttribute(key, value.toString());
            break;
        }
    }
    return element;
};
export const make = <T extends SvgTag>(source: { tag: T } & { [key: string]: string | number; }): SVGElementTagNameMap[T] =>
    setAttributes
    (
        document.createElementNS
        (
            "http://www.w3.org/2000/svg",
            source.tag
        ),
        source
    );
export const makeSure = <T extends SvgTag>(parent: SVGElement, selector: string, source: { tag: T } & { [key: string]: string | number; }): SVGElementTagNameMap[T] =>
{
    let element = parent.querySelector<SVGElementTagNameMap[T]>(selector);
    if ( ! element)
    {
        element = make(source);
        parent.appendChild(element);
    }
    return element;
};
