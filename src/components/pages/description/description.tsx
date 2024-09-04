import * as React from "react";
import { useState } from "react";
import Dropzone from "react-dropzone";

import { connect } from "react-redux";
import IFeatureRequest from "../../../interfaces/IFeatureRequest";
import { setFeatureRequest } from "../../../redux/actions/featureRequest.actions";
import {
  setCustomer,
  setMain,
} from "../../../redux/actions/requestStage.actions";
import NextBackButtons from "../../molecules/nextBackButtons/nextBackButtons";
import Userdropdown from "../../molecules/userDropdown/userdropdown";
import styles from "./description.module.scss";

import { IoIosAddCircleOutline } from "react-icons/io";
import {
  AnonymousCredential,
  BlobServiceClient,
  BlobUploadCommonResponse,
} from "@azure/storage-blob";

function Description(props: any) {
  const [requestHeadline, setRequestHeadline] = useState(
    props.featureRequest.requestHeadline
  );
  const [role, setRole] = useState<Number>(props.featureRequest.role);
  const [describedRole, setDescribedRole] = useState(
    props.featureRequest.otherRole
  );
  const [iWant, setIWant] = useState(props.featureRequest.iwant);
  const [to, setTo] = useState(props.featureRequest.to);
  const [descriptionField, setDescriptionField] = useState(
    props.featureRequest.description
  );
  const [filePath, setFilePath] = useState("");

  var date = new Date(Date.now());

  //File Upload Handler
  const AccountName = "featurerequeststorage";
  const SasToken =
    "?sv=2021-12-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-03-29T23:29:27Z&st=2023-03-29T14:29:27Z&spr=https&sig=ojZ2kogiMKdzAgum2ePqMQm8e2KLlwoywMHf%2FItyyIc%3D";
  const ContainerName = "featurerequestfiles";

  const inputFile = React.useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState<Boolean>(false);
  const [uploadingError, setUploadingError] = useState<string | null>(null);

  const [isValidationMessage, setIsValidationMessage] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const anonymousCredential = new AnonymousCredential();
        const blobServiceClient = new BlobServiceClient(
          `https://${AccountName}.blob.core.windows.net?${SasToken}`,
          anonymousCredential
        );

        // Create a container client
        const containerClient =
          blobServiceClient.getContainerClient(ContainerName);

        // Check if the container exists
        const containerExists = await containerClient.exists();
        if (!containerExists) {
          // Create the container if it does not exist
          await containerClient.create();
        }

        // Encode the file as a Base64 string
        const fileReader = new FileReader();
        fileReader.onloadend = async () => {
          // Upload the file to Azure Blob Storage
          const filePath = `${props.featureRequest.requesterName}/${requestHeadline}/${file.name}`;
          setFilePath(filePath);
          const blockBlobClient = containerClient.getBlockBlobClient(filePath);

          const response: BlobUploadCommonResponse =
            await blockBlobClient.uploadData(file);

          console.log(`File "${file.name}" uploaded to Azure Blob Storage.`);
          setIsFileUploaded(true);
          props.addFileName(file.name);
        };
        fileReader.readAsBinaryString(file);
      } catch (error) {
        console.error("Error uploading file:", error);
        setUploadingError(`Error uploading file: ${error}`);
      }
    }
  };

  React.useEffect(() => {
    handleUpload();
  }, [file]);

  return (
    <>
      <div className={styles.main__header__container}>
        <h2>Description</h2>
        <p>
          Add a title to your request. Try to describe the feature / issue in
          form of a user story. If none of the roles fit your user, just add As
          a f.i. Software Trainer in the ‚I want‘ box and we will add the user
          to the drop down list. The ‚to‘ box shall explain what it is you are
          trying to achieve/solve. If you have an example of a solution in mind,
          you can mention this in the description. If you have specific
          documents, screenshots, photos or sketches that help to understand the
          issue, feel free to upload these documents here.
        </p>
      </div>
      <div className={styles.description__content__container}>
        <div>
          <h3>
            Request Headline<span> *</span>
          </h3>
          <input
            placeholder="For e.g. Flag unwanted guest entries"
            type="text"
            className={styles.description__content__container__requestHeadline}
            value={requestHeadline}
            onChange={(e: any) => setRequestHeadline(e.target.value)}
          />
        </div>
        <div>
          <h3>
            As a...<span> *</span>
          </h3>

          <Userdropdown role={role} setRole={setRole} />
          {role == 5 && (
            <input
              className={styles.input__described__dole}
              placeholder="Describe your role..."
              value={describedRole}
              onChange={(e) => setDescribedRole(e.target.value)}
            />
          )}

          <h3>
            I want<span> *</span>
          </h3>
          <textarea
            placeholder="For e.g. HSH.Logic / Monitor (?) to inform me about flagged people of interest, when they try to enter the stadium."
            value={iWant}
            onChange={(e: any) => setIWant(e.target.value)}
          />
          <h3>
            to<span> *</span>
          </h3>
          <textarea
            placeholder="For e.g. Increase stadium security and be able to react to potential threats."
            value={to}
            onChange={(e: any) => setTo(e.target.value)}
          />
        </div>
        <div>
          <h3>
            Description<span> *</span>
          </h3>
          <textarea
            placeholder="For e.g. Ideally the system sends me a Whatsapp message, but any kind of instant notification will do"
            value={descriptionField}
            onChange={(e: any) => setDescriptionField(e.target.value)}
          />
        </div>
        <div>
          <h3>Related files:</h3>
          <Dropzone
            onDrop={(acceptedFiles) => {
              console.log(acceptedFiles);
              setFile(acceptedFiles[0]);
              handleUpload();
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className={styles.dropzone}>
                <input {...getInputProps()} />
                <div className={styles.dropBoxIconWrapper}>
                  <IoIosAddCircleOutline />
                </div>
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            )}
          </Dropzone>
          <p className={styles.addedFillesText}>Added File:</p>
          <ul>{isFileUploaded ? <li>{file?.name}</li> : <li>No files</li>}</ul>
          {isFileUploaded && (
            <p className={styles.addedFillesText}>
              File has been successfully uploaded.
            </p>
          )}
          {uploadingError && (
            <p className={styles.addedFillesText}>{uploadingError}</p>
          )}
        </div>
      </div>

      <div>
        {isValidationMessage && (
          <p className={styles.validationMessage}>
            Validate the completion of all mandatory fields.
          </p>
        )}
      </div>

      <NextBackButtons
        next={() => {
          if (
            requestHeadline !== "" &&
            iWant !== "" &&
            to !== "" &&
            descriptionField !== ""
          ) {
            setIsValidationMessage(false);
            props.setCustomer();
            props.setFeatureRequest({
              requestHeadline: requestHeadline,
              roleId: role,
              iwant: iWant,
              to: to,
              description: descriptionField,
              filePath: filePath,
              otherRole: describedRole,
            });
          } else {
            setIsValidationMessage(true);
          }
        }}
        back={() => props.setMain()}
      />
    </>
  );
}

const mapStateToProps: any = (state: any) => {
  return {
    requestStage: state.requestStage,
    featureRequest: state.featureRequest,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setFeatureRequest: (requestObject: IFeatureRequest) =>
      dispatch(setFeatureRequest(requestObject)),
    setCustomer: () => dispatch(setCustomer()),
    setMain: () => dispatch(setMain()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Description);
