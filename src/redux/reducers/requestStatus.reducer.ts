import { setREQUESTSTATUS } from "../constants/requestStatus.types";

const INITIAL_STATE: number = 0;

const RequestStatusReducer = function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    //ADMIN
    case setREQUESTSTATUS:
      return action.payload;
    default:
      return state;
  }
};

export default RequestStatusReducer;
