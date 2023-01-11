import React from "react";
import CommunityAvatar from "@/components/elements/community-avatar";
import { updateCommunity } from "@/base/lib/community";
import { useImageUpload } from "@/base/hooks/use-image-upload";
import styles from "./community-avatar-upload.module.scss";
import { CommunityAvatarUploadProps } from "./types";

export default function CommunityAvatarUpload({
  url,
  alt,
  folderName,
  fileName,
}: CommunityAvatarUploadProps) {
  const { handleUploadFile, uploading, publicUrl, downloadImageUrl } =
    useImageUpload({
      bucket: "community",
      folder: folderName,
      fileName: fileName,
    });

  async function handleOnSave() {
    if (publicUrl) {
      await updateCommunity(folderName, { avatar_url: publicUrl });
    }
  }

  const hasAvatarUrl = downloadImageUrl || url;

  return (
    <div>
      {hasAvatarUrl ? (
        <CommunityAvatar src={downloadImageUrl ?? url} alt={alt} />
      ) : null}
      <div>
        <label className="button primary block" htmlFor="community-avatar">
          {uploading ? "Uploading ..." : "Upload avatar"}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="community-avatar"
          accept="image/*"
          onChange={handleUploadFile}
          disabled={uploading}
        />
        <button onClick={handleOnSave}>Save</button>
      </div>
    </div>
  );
}
