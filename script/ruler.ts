import * as Type from "./type";
import * as UI from "./ui";
import * as Model from "./model";
import config from "../resource/config.json";
export const renderer = (model: Type.Model, _view: Type.View, _dirty: boolean | Set<number>) =>
{
    for(const slide of model.slides)
    {
        drawSlide(slide);
    }
    drawAnkorLine(model.anchor);
};
export const drawSlide = (slide: Type.SlideUnit): void =>
{
    const svg = UI.rulerSvg;
    let group = svg.querySelector<SVGGElement>(`g.slide-group[data-slide-index="${Model.getSlideIndex(slide)}"]`);
    if ( ! group)
    {
        group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.classList.add("slide-group");
        group.setAttribute("data-slide-index", Model.getSlideIndex(slide).toString());
        svg.appendChild(group);
    }
    // Clear previous lines
    group.innerHTML = "";
    for(const lane of slide.lanes)
    {
        drawLane(group, lane);
    }
};
export const drawLane = (_group: SVGGElement, _lane: Type.Lane): void =>
{
    // const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    // line.classList.add("lane-line");
    // line.setAttribute("x1", "0");
    // line.setAttribute("y1", Model.getPositionAt(lane, lane.startValue, UI.data).toString());
    // line.setAttribute("x2", UI.rulerSvg.viewBox.baseVal.width.toString());
    // line.setAttribute("y2", Model.getPositionAt(lane, lane.endValue, UI.data).toString());
    // const color = config.render.ruler.laneLineColor;
    // line.setAttribute("stroke", color);
    // line.setAttribute("stroke-width", config.render.ruler.laneLineWidth.toString());
    // group.appendChild(line);
};
export const drawAnkorLine = (position: number): void =>
{
    const svg = UI.rulerSvg;
    let line = svg.querySelector<SVGLineElement>("line.ankor-line");;
    if ( ! line)
    {
        line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.classList.add("ankor-line");
        svg.appendChild(line);
    }
    line.setAttribute("x1", "0");
    line.setAttribute("y1", position.toString());
    line.setAttribute("x2", svg.viewBox.baseVal.width.toString());
    line.setAttribute("y2", position.toString());
    //const color = "red";
    const color = config.render.ruler.lineColor;
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", config.render.ruler.lineWidth.toString());
    let dragHandle = svg.querySelector<SVGCircleElement>("circle.ankor-drag-handle");
    if ( ! dragHandle)
    {
        dragHandle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dragHandle.classList.add("ankor-drag-handle");
        svg.appendChild(dragHandle);
    }
    const handleRadius = 24;
    dragHandle.setAttribute("cx", (svg.viewBox.baseVal.width - handleRadius).toString());
    dragHandle.setAttribute("cy", position.toString());
    dragHandle.setAttribute("r", handleRadius.toString());
    dragHandle.setAttribute("fill", color);
};
export const resize = (): void =>
{
    const svg = UI.rulerSvg;
    document.body
    svg.setAttribute("width", document.body.clientWidth.toString());
    svg.setAttribute("height", document.body.clientHeight.toString());
    svg.setAttribute("viewBox", `0 0 ${document.body.clientWidth} ${document.body.clientHeight}`);
};
export const initialize = (): void =>
{
    resize();
};

