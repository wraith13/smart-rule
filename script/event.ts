// import * as Model from "./model";
import * as Type from "./type";
import * as Environment from "./environment";
import * as View from "./view";
import * as UI from "./ui";
import * as Render from "./render";
import * as Ruler from "./ruler";
import * as Grid from "./grid";
import * as Graph from "./graph";
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
export const zoomIn = (): void =>
{
    const current = View.data.viewScale;
    const next = current * 1.25;
    View.data.viewScale = next;
    Render.markDirty();
    console.log(`Zoomed in: ${current} -> ${next}`);
};
export const zoomOut = (): void =>
{
    const current = View.data.viewScale;
    const next = current / 1.25;
    View.data.viewScale = next;
    Render.markDirty();
    console.log(`Zoomed out: ${current} -> ${next}`);
};
export const resetZoom = (): void =>
{
    const current = View.data.viewScale;
    const next = 100;
    View.data.viewScale = next;
    Render.markDirty();
    console.log(`Zoom reset: ${current} -> ${next}`);
};
let touchZoomPreviousDistance: number | null = null;
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
    window.addEventListener
    (
        "wheel",
        event =>
        {

            if (Environment.isApple() ? event.metaKey : event.ctrlKey)
            {
                event.preventDefault();
                if (0 < event.deltaY)
                {
                    zoomOut();
                }
                else if (event.deltaY < 0)
                {
                    zoomIn();
                }
            }
        },
        {
            passive: false,
        }
    );
    window.addEventListener
    (
        "keydown",
        event =>
        {
            if (Environment.isApple() ? event.metaKey : event.ctrlKey)
            {
                switch(event.key)
                {
                case "+":
                case ";":
                case "=":
                    event.preventDefault();
                    zoomIn();
                    break;
                case "-":
                case "_":
                    event.preventDefault();
                    zoomOut();
                    break;
                case "0":
                    event.preventDefault();
                    resetZoom();
                    break;
                default:
                    console.log(`Keydown event: key=${event.key}`);
                    break;
                }
            }
        }
    );
    document.addEventListener
    (
        "pointerup",
        event =>
        {
            if ("touch" === event.pointerType && event.isPrimary)
            {
                touchZoomPreviousDistance = null;
            }
        },
        {
            passive: false,
        }
    );
    document.addEventListener
    (
        "pointercancel",
        event =>
        {
            if ("touch" === event.pointerType && event.isPrimary)
            {
                touchZoomPreviousDistance = null;
            }
        },
        {
            passive: false,
        }
    );
    document.addEventListener
    (
        "pointermove",
        event =>
        {
            if ("touch" === event.pointerType) // && event.isPrimary)
            {
                const touches = Array.from(event.getCoalescedEvents()).filter(e => e.pointerType === "touch");
                if (2 <= touches.length)
                {
                    const touch1 = touches[0];
                    const touch2 = touches[1];
                    const currentDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
                    if (null !== touchZoomPreviousDistance)
                    {
                        const delta = currentDistance - touchZoomPreviousDistance;
                        if (delta > 0)
                        {
                            zoomIn();
                        }
                        else if (delta < 0)
                        {
                            zoomOut();
                        }
                    }
                    touchZoomPreviousDistance = currentDistance;
                }
            }
        },
        {
            passive: true,
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

