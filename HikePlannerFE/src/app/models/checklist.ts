import { checklistItem } from "./checklistItem";

export interface checklist {
  id: number;
  name: string;
  dateCreated: null | Date;
  creator: string;
  checklistItems: null | checklistItem[] | undefined;
}
