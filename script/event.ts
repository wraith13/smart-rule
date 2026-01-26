// import { Model } from "./model";
import { Type } from "./type";
import { View } from "./view";
import { UI } from "./ui";
import { Render } from "./render";
import { Ruler } from "./ruler";
import { Grid } from "./grid";
import { Graph } from "./graph";
export namespace Event
{
    export const updateViewModeRoundBar = () => UI.updateRoundBar
    (
        UI.viewModeButton,
        {
            low: 0 /Type.viewModeList.length,
            high: 1 /Type.viewModeList.length,
            rotate: Type.viewModeList.indexOf(View.getViewMode()) /Type.viewModeList.length,
        }
    );
    export const updateScaleModeRoundBar = () => UI.updateRoundBar
    (
        UI.scaleModeButton,
        {
            low: 0 /Type.scaleModeList.length,
            high: 1 /Type.scaleModeList.length,
            rotate: Type.scaleModeList.indexOf(View.getScaleMode()) /Type.scaleModeList.length,
        }
    );
    export const initialize = () =>
    {
        console.log("Event initialized");
        window.addEventListener
        (
            "resize",
            () =>
            {
                Ruler.resize();
                Render.markDirty();
            }
        );
        UI.viewModeButton.addEventListener
        (
            "click",
            () =>
            {
                const current = View.getViewMode();
                const next = Type.getNext(Type.viewModeList, current);
                View.setViewMode(next);
                updateViewModeRoundBar();
                switch(next)
                {
                case "ruler":
                    Render.setRenderer(Ruler.renderer);
                    break;
                case "grid":
                    Render.setRenderer(Grid.renderer);
                    break;
                case "graph":
                    Render.setRenderer(Graph.renderer);
                    break;
                }
                Render.markDirty();
                console.log(`View mode changed: ${current} -> ${next}`);
            }
        );
        UI.scaleModeButton.addEventListener
        (
            "click",
            () =>
            {
                const current = View.getScaleMode();
                const next = Type.getNext(Type.scaleModeList, current);
                View.setScaleMode(next);
                updateScaleModeRoundBar();
                Render.markDirty();
                console.log(`Scale mode changed: ${current} -> ${next}`);
            }
        );
        updateViewModeRoundBar();
        updateScaleModeRoundBar();
    };
}
