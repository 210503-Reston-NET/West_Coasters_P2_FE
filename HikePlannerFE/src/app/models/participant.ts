import { activity } from "./activity";
import { trip } from "./trip";

export interface participant {
  id: number;
  userId: string;
  accept: boolean;
  tripId: number;
}

