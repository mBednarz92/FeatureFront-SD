import { useEffect, useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { connect } from "react-redux";
import styles from "./userDropdown.module.scss";

const userTypesArray = [
  "Service Technician",
  "Stadium Operator",
  "Fan/Guest",
  "Sales Representative",
  "Other...",
];

function UserDropdown(props: any) {
  const [userType, setUserType] = useState<string>(
    userTypesArray[props.featureRequest.roleId]
  );
  const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);

  function ParseRole(role: string) {
    {
      role === userTypesArray[0] && props.setRole(1);
    }
    {
      role === userTypesArray[1] && props.setRole(2);
    }
    {
      role === userTypesArray[2] && props.setRole(3);
    }
    {
      role === userTypesArray[3] && props.setRole(4);
    }
    {
      role === userTypesArray[4] && props.setRole(5);
    }
  }

  useEffect(() => {
    ParseRole(userType);
  }, [userType]);

  function handleMouseLeave() {
    setIsDropdownActive(false);
  }

  return (
    <div
      className={styles.description__content__container__dropDown__container}
    >
      <button
        onClick={() => setIsDropdownActive(!isDropdownActive)}
        style={
          isDropdownActive
            ? {
                borderBottomRightRadius: "0",
                borderBottomLeftRadius: "0",
              }
            : {}
        }
      >
        {userType}
        {isDropdownActive ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      <div
        className={styles.description__content__container__dropDown__list}
        onMouseLeave={() => setTimeout(handleMouseLeave, 300)}
        style={
          isDropdownActive
            ? { visibility: "visible" }
            : { visibility: "hidden" }
        }
      >
        {userTypesArray.map((user) => (
          <button
            onClick={() => {
              setIsDropdownActive(false);
              setUserType(user);
            }}
          >
            {user}
          </button>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps: any = (state: any) => {
  return {
    requestStage: state.requestStage,
    featureRequest: state.featureRequest,
  };
};

export default connect(mapStateToProps)(UserDropdown);
