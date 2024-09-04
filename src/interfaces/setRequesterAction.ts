import { Requester } from "../components/interfaces/requester";

export interface SetRequesterAction {
  type: string;
  payload: Requester;
}
