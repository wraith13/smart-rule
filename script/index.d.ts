declare module "script/url" {
    export namespace Url {
        const parseParameter: (url: string) => Record<string, string>;
        const make: () => string;
        const addParameter: (key: string, value: string) => Record<string, string>;
        const initialize: () => void;
        const params: Record<string, string>;
    }
}
declare module "script/type" {
    export namespace Type {
        type NamedNumber = number | "phi" | "e" | "pi";
        const phi: number;
        const getNamedNumberValue: (value: NamedNumber) => number;
        const getNamedNumberLabel: (value: NamedNumber, locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions) => string;
        type PrimaryLane = "primary" | "inverse" | "sine" | "cosine" | "tangent" | "cotangent" | "linear";
    }
}
declare module "script/view" {
    import { Type } from "script/type";
    export namespace View {
        type ViewMode = "ruler" | "grid";
        const getViewMode: () => ViewMode;
        const isRulerView: () => boolean;
        const isGridView: () => boolean;
        const setViewMode: (mode: ViewMode) => void;
        let viewScale: number;
        type ScaleMode = "linear" | "logarithmic";
        let scaleMode: ScaleMode;
        let baseOfLogarithm: Type.NamedNumber;
        const initialize: () => void;
    }
}
declare module "script/event" {
    export namespace Event {
        const initialize: () => void;
    }
}
declare module "script/index" { }
