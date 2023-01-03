import React, { useEffect, useState } from "react";
import { supabase } from "@/base/config/supabase";
import CommunityAvatar from "@/components/elements/community-avatar";
import { updateCommunity } from "@/base/lib/community";
import styles from "./community-avatar-upload.module.scss";
import { CommunityAvatarUploadProps } from "./types";

export default function CommunityAvatarUpload({
  url,
  alt,
  uid,
  slug,
}: CommunityAvatarUploadProps) {
  const [uploadFileUrl, setUploadFileUrl] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [signedUrl, setSignedUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (uploadFileUrl) {
      downloadImage(uploadFileUrl);
    }
  }, [uploadFileUrl]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("community-avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const { data: urlData } = await supabase.storage
        .from("community-avatars")
        .createSignedUrl(path, 60);

      const url = URL.createObjectURL(data);
      setSignedUrl(urlData.signedURL);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }

  async function handleUploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${slug}.${fileExt}`;
      const filePath = `${uid}/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("community-avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      setUploadFileUrl(filePath);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  }

  async function handleOnSave() {
    if (signedUrl) {
      await updateCommunity(uid, { avatar_url: signedUrl });
    }
  }

  return (
    <div>
      {url ? <CommunityAvatar src={avatarUrl || url} alt={alt} /> : null}
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
