import React, { useState, useEffect } from "react";
import { supabase } from "@/base/config/supabase";

export function useImageUpload({
  bucket,
  folder,
  fileName,
}: {
  bucket: string;
  folder: string;
  fileName: string;
}) {
  const [uploadFileUrl, setUploadFileUrl] = useState(null);
  const [downloadImageUrl, setDownloadImageUrl] = useState(null);
  const [publicUrl, setPublicUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (uploadFileUrl) {
      setUploadedImage(uploadFileUrl);
    }
  }, [uploadFileUrl]);

  async function downloadImage(path: string) {
    const { data, error } = await supabase.storage.from(bucket).download(path);

    const url = URL.createObjectURL(data);
    setDownloadImageUrl(url);
  }

  async function getPublicUrl(path: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    setPublicUrl(data.publicURL);
  }

  async function setUploadedImage(path: string) {
    try {
      await getPublicUrl(path);
      await downloadImage(path);
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
      const filename = `${fileName}.${fileExt}`;
      const filePath = `${folder}/${filename}`;

      let { error: uploadError } = await supabase.storage
        .from(bucket)
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

  return {
    handleUploadFile,
    uploading,
    publicUrl,
    downloadImageUrl,
  };
}
