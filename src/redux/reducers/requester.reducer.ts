import { Requester } from "../../components/interfaces/requester";
import { setEMPTY, setREQUESTER } from "../constants/requester.types";
import { SetRequesterAction } from "../../interfaces/setRequesterAction";

const INITIAL_STATE: Requester = {
  requestID: "",
  requestDate: "",
  requesterName: "",
  sdUnit: "",
  department: "",
};

const RequesterReducer = function (
  state = INITIAL_STATE,
  action: SetRequesterAction
) {
  switch (action.type) {
    case setEMPTY:
      return INITIAL_STATE;
    case setREQUESTER:
      const requester: Requester = {
        requestID: action.payload.requestID,
        requestDate: action.payload.requestDate,
        requesterName: action.payload.requesterName,
        sdUnit: action.payload.sdUnit,
        department: action.payload.department,
      };
      return requester;
    default:
      return state;
  }
};

export default RequesterReducer;
