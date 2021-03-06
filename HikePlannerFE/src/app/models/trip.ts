import { activity } from "./activity";
import { participant } from "./participant";
import { user } from "./user";

export interface trip {
  id: number;
  activityId: number;
  startDate: string;
  endDate: string;
  distance: number;
  creator: string;
  participants: null | participant[];
  activity: null | activity
  user : null | user
}
