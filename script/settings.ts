import * as UI from "./ui";
import config from "@resource/config.json";
export const isIncludeCursor = (): boolean => UI.SavePanel.includeCursorCheckbox.checked;
// export const getLanguage = (): string => UI.SettingsPanel.languageSelect.value;
export const getTheme = (): string => UI.SettingsPanel.themeSelect.value;
export const getThreeDigitSeparator = (): "none" | "custom" | "thin-space" =>
    UI.SettingsPanel.threeDigitSeparatorSelect.value as ReturnType<typeof getThreeDigitSeparator>;
export const getExponentFormat = (): "e" | "x10" =>
    UI.SettingsPanel.exponentFormatSelect.value as ReturnType<typeof getExponentFormat>;
export const getExponentMultipleOfThree = (): boolean =>
    UI.SettingsPanel.exponentMultipleOfThreeCheckbox.checked;
export const getNumberFormat = (): "scientific" | "localized" =>
    UI.SettingsPanel.numberFormatSelect.value as ReturnType<typeof getNumberFormat>;
export const getApproximateSymbol = () =>
    UI.SettingsPanel.approximateSymbolSelect.value as keyof typeof config.symbols.approximateSymbols;
export const getRangeSymbol = () =>
    UI.SettingsPanel.rangeSymbolSelect.value as keyof typeof config.symbols.rangeSymbols;
export const getOrSymbol = () =>
    UI.SettingsPanel.orSymbolSelect.value as keyof typeof config.symbols.orSymbols;
export const getAllSettings = () => // URL パラメーターで使うので短く！ / EN: Short for URL parameters!
({
    i: isIncludeCursor(),
    l: UI.SettingsPanel.languageSelect.value,
    t: getTheme(),
    s: getThreeDigitSeparator(),
    e: getExponentFormat(),
    m: getExponentMultipleOfThree(),
    n: getNumberFormat(),
    a: getApproximateSymbol(),
    r: getRangeSymbol(),
    o: getOrSymbol(),
});
export const applySettings = (settings: ReturnType<typeof getAllSettings>) =>
{
    UI.SavePanel.includeCursorCheckbox.checked = settings.i;
    UI.SettingsPanel.languageSelect.value = settings.l;
    UI.SettingsPanel.themeSelect.value = settings.t ?? "auto";
    UI.SettingsPanel.threeDigitSeparatorSelect.value = settings.s ?? "thin-space";
    UI.SettingsPanel.exponentFormatSelect.value = settings.e ?? "x10";
    UI.SettingsPanel.exponentMultipleOfThreeCheckbox.checked = settings.m;
    UI.SettingsPanel.numberFormatSelect.value = settings.n ?? "scientific";
    UI.SettingsPanel.approximateSymbolSelect.value = settings.a ?? "tilde";
    UI.SettingsPanel.rangeSymbolSelect.value = settings.r ?? "ellipsis";
    UI.SettingsPanel.orSymbolSelect.value = settings.o ?? "union";
};
