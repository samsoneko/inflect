export type WordEntry = {
	word: string;
	translation?: string;
	inflection: Record<string, any>; // or use InflectionTree if you're building that out
};