import { setREQUESTSTATUS } from "../constants/requestStatus.types";

export const setRequestStatus = (status: number) => {
  return {
    type: setREQUESTSTATUS,
    payload: status,
  };
};
