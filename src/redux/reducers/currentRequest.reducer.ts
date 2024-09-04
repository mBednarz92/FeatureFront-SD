import IFeatureRequest from "../../interfaces/IFeatureRequest";
import { SetRequesterAction } from "../../interfaces/setRequesterAction";
import {
  resetCURRENTREQUEST,
  setCURRENTREQUEST,
} from "../constants/currentRequest.types";

const INITIAL_STATE: IFeatureRequest = {
  requesterName: "",
  requesterMail: "",
  requestDate: new Date(),
  sdUnit: "",
  department: "",
  requestHeadline: "",
  roleId: 0,
  iwant: "",
  to: "",
  description: "",
  customerName: "",
  deadline: new Date(),
  installation: new Date(),
  filePath: "",
};

const CurrentRequestReducer = function (
  state = INITIAL_STATE,
  action: SetRequesterAction
) {
  switch (action.type) {
    case resetCURRENTREQUEST:
      return INITIAL_STATE;
    case setCURRENTREQUEST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default CurrentRequestReducer;
