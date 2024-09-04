import { connect } from "react-redux";
import styles from "./popOut.module.scss";

import IFeatureRequest from "../../../interfaces/IFeatureRequest";
import { setRequestView } from "../../../redux/actions/requestStage.actions";
import { setCurrentRequest } from "../../../redux/actions/currentRequest.actions";

function PopOut(props: any) {
  return (
    <div className={styles.popOut__main__container}>
      <div className={styles.popOut__window__container}>
        {props.requestStatus === 200 && (
          <>
            <h3>Your request has been sent!</h3>
            <p>
              Thank you! You will receive a confirmation in your mailbox in a
              few minutes.
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                window.location.href =
                  "https://team.skidata.net/org/HQ/PLM/ble/SitePages/Home.aspx";
              }}
            >
              Finish
            </button>
          </>
        )}
        {props.requestStatus === 0 && (
          <>
            <h3>Sending</h3>
            <p>Processing your request...</p>
            <button onClick={() => props.setPopOut(false)}>Back</button>
          </>
        )}

        {props.requestStatus !== 0 && props.requestStatus !== 200 && (
          <>
            <h3>Error</h3>
            <p>
              It appears that there may be an issue with sending your request.
              Please attempt to resend the request and should the error persist,
              kindly reach out to Benjamin Rowley at benjamin.rowley@skidata.com
              for further assistance. Thank you.
            </p>
            <button onClick={() => props.setPopOut(false)}>Back</button>
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps: any = (state: any) => {
  return {
    requestStatus: state.requestStatus,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setRequestView: () => dispatch(setRequestView()),
    setCurrentRequest: (currentRequest: IFeatureRequest) =>
      dispatch(setCurrentRequest(currentRequest)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopOut);
