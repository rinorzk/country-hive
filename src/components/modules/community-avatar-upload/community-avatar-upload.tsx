import React from "react";
import CommunityAvatar from "@/components/elements/community-avatar";
import { updateCommunity } from "@/base/lib/community";
import { useImageUpload } from "@/base/hooks/use-image-upload";
import styles from "./community-avatar-upload.module.scss";
import { CommunityAvatarUploadProps } from "./types";

export default function CommunityAvatarUpload({
  url,
  alt,
  uid,
  slug,
}: CommunityAvatarUploadProps) {
  const { handleUploadFile, uploading, signedUrl, downloadImageUrl } =
    useImageUpload({
      bucket: "community-avatars",
      folder: uid,
      fileName: slug,
    });

  async function handleOnSave() {
    if (signedUrl) {
      await updateCommunity(uid, { avatar_url: signedUrl });
    }
  }

  const hasAvatarUrl = downloadImageUrl || url;

  return (
    <div>
      {hasAvatarUrl ? (
        <CommunityAvatar src={downloadImageUrl ?? url} alt={alt} />
      ) : null}
      <div>
        <label className="button primary block" htmlFor="single">
          {uploading ? "Uploading ..." : "Upload"}
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
