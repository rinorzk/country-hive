import React, { FormEvent, useState } from "react";
import Modal from "react-modal";
import { customModalStyles } from "@/base/styles/modal-style";
import styles from "./new-post-modal.module.scss";
import { NewPostModalProps } from "./types";

export default function NewPostModal({
  isOpen,
  onClose,
  handleNewPost,
  userId,
  communityId,
}: NewPostModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddPost = (e: FormEvent) => {
    e.preventDefault();
    try {
      handleNewPost({
        title,
        description,
        creator_id: userId,
        community_id: communityId,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customModalStyles}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      ariaHideApp={false}
    >
      <h3>Create new post</h3>
      <form onSubmit={handleAddPost}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder="Post description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create post</button>
      </form>
    </Modal>
  );
}
