import { PollResponse } from "./PollResponse";

export interface Poll {
    title: string;
    description?: string;
    x: string[];
    y?: string[];
    responses: PollResponse[];
}
