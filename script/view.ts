import { Url } from "./url";
import { Type } from "./type";
import { UI } from "./ui";
import config from "@resource/config.json";
export namespace View
{
    export type ViewMode = "ruler" | "grid";
    let viewMode: ViewMode;
    export const getViewMode = (): ViewMode => viewMode;
    export const isRulerView = (): boolean => viewMode === "ruler";
    export const isGridView = (): boolean => viewMode === "grid";
    export const setViewMode = (mode: ViewMode): void =>
    {
        viewMode = mode;
        Url.addParameter("view-mode", mode);
        document.body.classList.toggle("grid-view", isGridView());
        document.body.classList.toggle("ruler-view", isRulerView());
        UI.setAriaHidden(UI.rulerView, ! isRulerView());
        UI.setAriaHidden(UI.gridView, ! isGridView());
    };
    export let viewScale: number;
    export type ScaleMode = "linear" | "logarithmic";
    export let scaleMode: ScaleMode;
    export let baseOfLogarithm: Type.NamedNumber;
    export const initialize = () =>
    {
        setViewMode(Url.params["view-mode"] as ViewMode ?? config.view?.defaultMode ?? "ruler");
        viewScale = Number(Url.params["view-scale"]) || 1;
        scaleMode = Url.params["scale-mode"] as ScaleMode ?? config.view?.defaultScale ?? "logarithmic";
        baseOfLogarithm = Number(Type.getNamedNumberValue(Url.params["base"] as Type.NamedNumber))
            || config.view?.baseOfLogarithm?.default
            || 10;
    };
}
