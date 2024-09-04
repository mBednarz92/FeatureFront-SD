import {
  setADMIN,
  setCUSTOMER,
  setDESCRIPTION,
  setMAIN,
  setREQUESTVIEW,
  setSUMMARY,
} from "../constants/requestStage.types";

export const setMain = () => {
  return {
    type: setMAIN,
  };
};

export const setDescription = () => {
  return {
    type: setDESCRIPTION,
  };
};

export const setCustomer = () => {
  return {
    type: setCUSTOMER,
  };
};

export const setSummary = () => {
  return {
    type: setSUMMARY,
  };
};

export const setAdmin = () => {
  return {
    type: setADMIN,
  };
};

export const setRequestView = () => {
  return {
    type: setREQUESTVIEW,
  };
};
