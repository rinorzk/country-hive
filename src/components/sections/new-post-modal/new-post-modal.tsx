import React, { FormEvent, useState } from "react";
import Modal from "react-modal";
import dynamic from "next/dynamic";
import kebabCase from "lodash/kebabCase";
import { customModalStyles } from "@/base/styles/modal-style";
import styles from "./new-post-modal.module.scss";
import { NewPostModalProps } from "./types";

const DynamicRichtextEditor = dynamic(
  () => import("@/components/sections/richtext-editor"),
  { ssr: false }
);

export default function NewPostModal({
  isOpen,
  onClose,
  handleNewPost,
  userId,
  communityId,
}: NewPostModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState({});

  function handleAddPost(e: FormEvent) {
    e.preventDefault();

    try {
      handleNewPost({
        title,
        content,
        creator_id: userId,
        community_id: communityId,
        slug: kebabCase(title),
      });
      onClose();
    } catch (error) {
      console.log("error", error);
    }
  }

  function handleContentOnSave(data: any) {
    if (data) {
      setContent(data);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customModalStyles}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      ariaHideApp={false}
    >
      <h3>Create new post</h3>
      <form onSubmit={handleAddPost} className={styles.postModal}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <DynamicRichtextEditor onSave={handleContentOnSave} />
        <button type="submit">Create post</button>
      </form>
    </Modal>
  );
}
