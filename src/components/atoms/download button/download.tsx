import React from "react";
import {
  BlobServiceClient,
  BlobDownloadResponseModel,
} from "@azure/storage-blob";

interface DownloadProps {
  containerName: string;
  blobName: string;
  sasToken: string;
  accountName: string;
}

const Download: React.FC<DownloadProps> = ({
  containerName,
  blobName,
  sasToken,
  accountName,
}) => {
  const downloadBlob = async () => {
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net${sasToken}`
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    try {
      const downloadResponse: BlobDownloadResponseModel =
        await blobClient.download();
      const blobBody = downloadResponse.blobBody;
      if (!blobBody) {
        console.log("Blob body is undefined");
        return;
      }
      const url = window.URL.createObjectURL(await blobBody);
      if (!url) {
        console.log("Failed to create object URL");
        return;
      }
      const link = document.createElement("a");
      link.href = url;
      link.download = blobName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={downloadBlob}>
      Download {blobName.split("/").slice(-1)}
    </button>
  );
};

export default Download;
