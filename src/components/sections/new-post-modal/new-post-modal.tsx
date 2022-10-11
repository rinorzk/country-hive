import React, { FormEvent, useState } from "react";
import Modal from "react-modal";
import styles from "./new-post-modal.module.scss";
import { NewPostModalProps } from "./types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

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
      style={customStyles}
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
        <label htmlFor="description">Title:</label>
        <textarea
          id="description"
          placeholder="Post title"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </form>
    </Modal>
  );
}
