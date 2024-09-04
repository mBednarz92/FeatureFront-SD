import { connect } from "react-redux";
import { setAdmin, setMain } from "../../../redux/actions/requestStage.actions";
import NextBackButtons from "../../molecules/nextBackButtons/nextBackButtons";
import styles from "./requestView.module.scss";
import CurrentRequestTabele from "../../molecules/currentRequestTabele/currentRequestTabele";
import { useEffect } from "react";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import Download from "../../atoms/download button/download";

window.Buffer = window.Buffer || require("buffer").Buffer;

function RequestView(props: any) {
  const userTypesArray = [
    "Service Technician",
    "Stadium Operator",
    "Fan/Guest",
    "Sales Representative",
  ];

  const containerName = "featurerequestfiles";
  const accountName = "featurerequeststorage";
  const sasToken =
    "?sv=2021-12-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-03-30T19:50:50Z&st=2023-03-30T10:50:50Z&spr=https&sig=6OhYYR35urE1KKZ4uEWdHeWcGPN7B8JCkUhyVdkXENg%3D";

  return (
    <>
      <div className={styles.main__header__container}>
        <h2>{props.currentRequest.requestHeadline}</h2>
      </div>
      <h1></h1>
      <h2>Requester</h2>
      <div className={styles.requestView__section__requester}>
        <div>
          <h3>Requester Name:</h3>
          <p>{props.currentRequest.requesterName}</p>
          <p>{props.currentRequest.requesterMail}</p>
        </div>
        <div>
          <h3>SD Unit:</h3>
          <p>{props.currentRequest.sdUnit}</p>
        </div>
        <div>
          <h3>Departement:</h3>
          <p>{props.currentRequest.department}</p>
        </div>
      </div>
      <h2>Description</h2>
      <div className={styles.summary__section}>
        <div>
          <h3>As a:</h3>
          {props.currentRequest.roleId === 5 ? (
            <p>{props.currentRequest.otherRole}</p>
          ) : (
            <p>{userTypesArray[props.currentRequest.roleId - 1]}</p>
          )}
        </div>
        <div>
          <h3>I want:</h3>
          <p>{props.currentRequest.iwant}</p>
        </div>
        <div>
          <h3>To:</h3>
          <p>{props.currentRequest.to}</p>
        </div>
        <div>
          <h3>Description:</h3>
          <p>{props.currentRequest.description}</p>
        </div>
        <div>
          <h3>Attatched file:</h3>
          {props.currentRequest.filePath ? (
            <Download
              containerName={containerName}
              blobName={props.currentRequest.filePath}
              sasToken={sasToken}
              accountName={accountName}
            />
          ) : (
            <p>Empty</p>
          )}
        </div>
      </div>
      <h2>Customer Related</h2>
      {props.currentRequest.customerName === "" ? (
        <p>NO</p>
      ) : (
        <div className={styles.summary__section}>
          <div>
            <h3>Project/Customer Name:</h3>
            <p>{props.currentRequest.customerName}</p>
          </div>
          <div>
            <h3>Estimated Call for Tender Deadline:</h3>
            <p>
              {
                new Date(props.currentRequest.deadline)
                  .toLocaleString("de-DE")
                  .split(",")[0]
              }
            </p>
          </div>
          <h3>Estimated Installation Date:</h3>
          <p>
            {
              new Date(props.currentRequest.installation)
                .toLocaleString("de-DE")
                .split(",")[0]
            }
          </p>
        </div>
      )}
      <NextBackButtons
        back={() => {
          props.setAdmin();
        }}
      />
    </>
  );
}

const mapStateToProps: any = (state: any) => {
  return {
    currentRequest: state.currentRequest,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setAdmin: () => dispatch(setAdmin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestView);
