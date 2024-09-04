import { Requester } from "../../components/interfaces/requester";
import { setEMPTY, setREQUESTER } from "../constants/requester.types";
import { SetRequesterAction } from "../../interfaces/setRequesterAction";

export const setEmpty = () => {
  return {
    type: setEMPTY,
  };
};

export const setRequester = (
  requesterObject: Requester
): SetRequesterAction => {
  return {
    type: setREQUESTER,
    payload: requesterObject,
  };
};
