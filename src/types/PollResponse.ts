export interface PollResponse {
    name: string;
    selections: {
        x: string;
        y?: string;
        selection: "yes" | "no" | "unknown";
    }[];
}
