export type Theme = Record<string, string>;
export declare const colorThemes: Record<string, Theme>;
export declare const otherThemes: Record<string, Record<string, string>>;
export declare function hexToChannels(hex: string): string;
export declare function themeVariables(name: string): Record<string, string>;
export declare const themeNames: string[];
