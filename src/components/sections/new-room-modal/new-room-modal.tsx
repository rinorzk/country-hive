import React, { FormEvent, useState } from "react";
import Modal from "react-modal";
import kebabCase from "lodash/kebabCase";
import { customModalStyles } from "@/base/styles/modal-style";
import styles from "./new-post-modal.module.scss";
import { NewRoomModalProps } from "./types";

export default function NewRoomModal({
  isOpen,
  onClose,
  handleNewRoom,
  userId,
  communityId,
}: NewRoomModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleAddRoom(e: FormEvent) {
    e.preventDefault();
    try {
      handleNewRoom({
        title,
        description,
        creator_id: userId,
        community_id: communityId,
        slug: kebabCase(title),
      });
      onClose();
    } catch (error) {
      console.log("error", error);
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
      <h3>Create new room</h3>
      <form onSubmit={handleAddRoom}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          placeholder="Room title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder="Room description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create room</button>
      </form>
    </Modal>
  );
}
