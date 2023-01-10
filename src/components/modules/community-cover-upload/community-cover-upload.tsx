import React from "react";
import CommunityCover from "@/components/elements/community-cover";
import { updateCommunity } from "@/base/lib/community";
import { useImageUpload } from "@/base/hooks/use-image-upload";
import styles from "./community-cover-upload.module.scss";
import { CommunityCoverUploadProps } from "./types";

export default function CommunityCoverUpload({
  url,
  alt,
  folderName,
  fileName,
}: CommunityCoverUploadProps) {
  const { handleUploadFile, uploading, signedUrl, downloadImageUrl } =
    useImageUpload({
      bucket: "community",
      folder: folderName,
      fileName: fileName,
    });

  async function handleOnSave() {
    if (signedUrl) {
      await updateCommunity(folderName, { cover_url: signedUrl });
    }
  }

  const hasCoverUrl = downloadImageUrl || url;

  return (
    <div>
      {hasCoverUrl ? (
        <CommunityCover src={downloadImageUrl ?? url} alt={alt} />
      ) : null}
      <div>
        <label className="button primary block" htmlFor="single">
          {uploading ? "Uploading ..." : "Upload cover"}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={handleUploadFile}
          disabled={uploading}
        />
        <button onClick={handleOnSave}>Save</button>
      </div>
    </div>
  );
}
