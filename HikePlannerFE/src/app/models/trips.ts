import { activity } from "./activity";

export interface trips {
    id: number;
    activityId: number;
    startDate: string;
    endDate: string;
    distance: number;
    creator: string;
    activities: activity;
    checklistId: number;
}