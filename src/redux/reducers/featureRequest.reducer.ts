import IFeatureRequest from "../../interfaces/IFeatureRequest";
import {
  resetFEATUREREQUEST,
  setFEATUREREQUEST,
} from "../constants/featureRequest.types";
import { SetRequesterAction } from "../../interfaces/setRequesterAction";

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

const FeatureRequestReducer = function (
  state = INITIAL_STATE,
  action: SetRequesterAction
) {
  switch (action.type) {
    case resetFEATUREREQUEST:
      return INITIAL_STATE;
    case setFEATUREREQUEST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default FeatureRequestReducer;
