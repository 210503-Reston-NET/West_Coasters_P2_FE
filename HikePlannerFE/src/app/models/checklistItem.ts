import { equipment } from "./equipment";

export interface checklistItem {
  id: number;
  quantity: number;
  checklistId: number;
  equipmentId: number;
  equipment: null | equipment;
}

type Nullable<T> = T | null;
