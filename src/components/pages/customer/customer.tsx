import * as React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import { connect } from "react-redux";
import IFeatureRequest from "../../../interfaces/IFeatureRequest";
import { setFeatureRequest } from "../../../redux/actions/featureRequest.actions";
import {
  setDescription,
  setSummary,
} from "../../../redux/actions/requestStage.actions";
import NextBackButtons from "../../molecules/nextBackButtons/nextBackButtons";
import styles from "./customer.module.scss";

import "react-calendar/dist/Calendar.css";

function Customer(props: any) {
  let date = new Date(Date.now());

  const [isCustomerRelated, setIsCustomerRelated] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState("");
  const [deadline, setDeadline] = useState<any>(null);
  const [installation, setInstallation] = useState<any>(null);
  const [sellectedButtonId, setSellectedButtonId] = useState(0);

  const [isValidationMessage, setIsValidationMessage] = useState(false);

  function handleDateChange(date: Date | (Date | null)[]) {
    if (date !== null) {
      {
        sellectedButtonId === 1 &&
          setDeadline(date.toLocaleString("de-DE").split(",")[0]);
      }
      {
        sellectedButtonId === 2 &&
          setInstallation(date.toLocaleString("de-DE").split(",")[0]);
      }
    }
  }

  const [value, onChange] = useState(new Date());

  return (
    <>
      <div className={styles.main__header__container}>
        <h2>Customer</h2>
        <p>
          If your request is related to a specific customer or project, please
          tick the box and let us know some basic data, so we can better
          prioritize your request and plan the implementation.
        </p>
      </div>
      <div className={styles.customer__checkbox__container}>
        <input
          type="checkbox"
          onClick={() => setIsCustomerRelated(!isCustomerRelated)}
        />
        <p>Specific customer related?</p>
      </div>

      {isCustomerRelated && (
        <>
          <div className={styles.customer__content__container}>
            <div>
              <h3>
                Project / Customer Name <span> *</span>
              </h3>
              <input
                type="text"
                value={customerName}
                onChange={(e: any) => setCustomerName(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.calendar__values__container}>
            <p>
              Press "Select Date" button and chose date with calendar for
              selected input.
            </p>
            <div className={styles.calendar__feature__container}>
              <div className={styles.calendar__inputs__container}>
                <h3>Estimated Call for Tender Deadline</h3>
                <div>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e: any) => setDeadline(e.target.value)}
                  />
                  <button
                    onClick={() => setSellectedButtonId(1)}
                    className={
                      sellectedButtonId === 1
                        ? styles.button__date__selected
                        : styles.button__date
                    }
                  >
                    Select Date
                  </button>
                </div>
                <h3>Estimated Installation Date</h3>
                <div>
                  <input
                    type="text"
                    value={installation}
                    onChange={(e: any) => setInstallation(e.target.value)}
                  />
                  <button
                    onClick={() => setSellectedButtonId(2)}
                    className={
                      sellectedButtonId === 2
                        ? styles.button__date__selected
                        : styles.button__date
                    }
                  >
                    Select Date
                  </button>
                </div>
              </div>
              <Calendar
                value={value}
                onChange={(value, Event) => {
                  if (value !== null) {
                    handleDateChange(value);
                  }
                }}
              />
            </div>
          </div>
        </>
      )}
      <div>
        {isValidationMessage && (
          <p className={styles.validationMessage}>
            Validate the completion of all mandatory fields.
          </p>
        )}
      </div>
      <NextBackButtons
        next={() => {
          if (isCustomerRelated === true) {
            if (customerName !== "") {
              setIsValidationMessage(false);
              props.setSummary();
              if (isCustomerRelated) {
                var deadlineValue = null;
                if (deadline !== null) {
                  const dateParts = deadline.split(".");
                  const year = Number(dateParts[2]);
                  const month = Number(dateParts[1]) - 1;
                  const day = Number(dateParts[0]);
                  deadlineValue = new Date(year, month, day).toISOString();
                }

                var installationValue = null;
                if (installation !== null) {
                  const insdateParts = installation.split(".");
                  const insyear = Number(insdateParts[2]);
                  const insmonth = Number(insdateParts[1]) - 1;
                  const insday = Number(insdateParts[0]);
                  installationValue = new Date(
                    insyear,
                    insmonth,
                    insday
                  ).toISOString();
                }
                props.setFeatureRequest({
                  customerName: customerName,
                  deadline: deadlineValue,
                  installation: installationValue,
                });
              } else {
                props.setFeatureRequest({
                  customerName: "",
                  deadline: null,
                  installation: null,
                });
              }
            } else {
              setIsValidationMessage(true);
            }
          } else {
            props.setSummary();
          }
        }}
        back={() => props.setDescription()}
      />
    </>
  );
}

const mapStateToProps: any = (state: any) => {
  return {
    requestStage: state.requestStage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setFeatureRequest: (requestObject: IFeatureRequest) =>
      dispatch(setFeatureRequest(requestObject)),
    setSummary: () => dispatch(setSummary()),
    setDescription: () => dispatch(setDescription()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
