import axios from "axios";
import * as React from "react";
import { connect } from "react-redux";
import IFeatureRequest from "../../../interfaces/IFeatureRequest";
import {
  setCustomer,
  setMain,
  setSummary,
} from "../../../redux/actions/requestStage.actions";
import NextBackButtons from "../../molecules/nextBackButtons/nextBackButtons";
import styles from "./summary.module.scss";
import { setRequestStatus } from "../../../redux/actions/requestStatus.actions";

function Summary(props: any) {
  const userTypesArray = [
    "Service Technician",
    "Stadium Operator",
    "Fan/Guest",
    "Sales Representative",
  ];

  function sendRequestHandler(request: IFeatureRequest) {
    console.log("Provided request data: ");
    console.log(request);

    axios
      .post(
        `https://featurerequest20230327114557.azurewebsites.net/request/add`,
        request
      )
      .then((response) => {
        console.log("Service response:");
        console.log(response.status);
        props.setRequestStatus(response.status);
      });
  }

  return (
    <>
      <div className={styles.main__header__container}>
        <h2>Summary</h2>
        <p>
          Please check if the following data is correct before sending this
          request.
        </p>
      </div>
      <h1>{props.featureRequest.requestHeadline}</h1>
      <h2>Requester</h2>
      <div className={styles.summary__section__requester}>
        <div>
          <h3>Requester Name:</h3>
          <p>{props.featureRequest.requesterName}</p>
        </div>
        <div>
          <h3>SD Unit:</h3>
          <p>{props.featureRequest.sdUnit}</p>
        </div>
        <div>
          <h3>Departement:</h3>
          <p>{props.featureRequest.department}</p>
        </div>
      </div>
      <h2>Description</h2>
      <div className={styles.summary__section}>
        <div>
          <h3>As a:</h3>
          {props.featureRequest.roleId === 5 ? (
            <p>{props.featureRequest.otherRole}</p>
          ) : (
            <p>{userTypesArray[props.featureRequest.roleId - 1]}</p>
          )}
        </div>
        <div>
          <h3>I want:</h3>
          <p>{props.featureRequest.iwant}</p>
        </div>
        <div>
          <h3>To:</h3>
          <p>{props.featureRequest.to}</p>
        </div>
        <div>
          <h3>Description:</h3>
          <p>{props.featureRequest.description}</p>
        </div>
        <div>
          <h3>Attatched file:</h3>
          <p>{props.featureRequest.filePath}</p>
        </div>
      </div>
      <h2>Customer Related</h2>
      {props.featureRequest.customerName === "" ? (
        <p>NO</p>
      ) : (
        <div className={styles.summary__section}>
          <div>
            <h3>Project/Customer Name:</h3>
            <p>{props.featureRequest.customerName}</p>
          </div>
          <div>
            <h3>Estimated Call for Tender Deadline:</h3>
            <p>
              {
                new Date(props.featureRequest.deadline)
                  .toLocaleString("de-DE")
                  .split(",")[0]
              }
            </p>
          </div>
          <h3>Estimated Installation Date:</h3>
          <p>
            {
              new Date(props.featureRequest.installation)
                .toLocaleString("de-DE")
                .split(",")[0]
            }
          </p>
        </div>
      )}

      <NextBackButtons
        next={() => {
          props.setPopOut(true);
          sendRequestHandler(props.featureRequest);
        }}
        back={() => props.setCustomer()}
      />
    </>
  );
}

const mapStateToProps: any = (state: any) => {
  return {
    requestStage: state.requestStage,
    requester: state.requester,
    featureRequest: state.featureRequest,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMain: () => dispatch(setMain()),
    setCustomer: () => dispatch(setCustomer()),
    setSummary: () => dispatch(setSummary()),
    setRequestStatus: (statusNumber: number) =>
      dispatch(setRequestStatus(statusNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
