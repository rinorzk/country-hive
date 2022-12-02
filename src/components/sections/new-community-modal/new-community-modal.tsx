import React, { FormEvent, useState } from "react";
import Modal from "react-modal";
import kebabCase from "lodash/kebabCase";
import { customModalStyles } from "@/base/styles/modal-style";
import styles from "./new-community-modal.module.scss";
import { NewCommunityModalProps } from "./types";

export default function NewCommunityModal({
  isOpen,
  onClose,
  userId,
  country,
  handleNewCommunity,
}: NewCommunityModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"public" | "restricted" | "private">(
    "public"
  );

  async function handleAddCommunity(e: FormEvent) {
    e.preventDefault();
    try {
      handleNewCommunity({
        name,
        type,
        creator_id: userId,
        country,
        slug: kebabCase(name),
      });
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
      <h3>Create new community</h3>
      <form onSubmit={handleAddCommunity}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          placeholder="Community name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          placeholder="Community type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
          <option value="restricted">Restricted</option>
        </select>

        <br />

        <button type="submit">Create community</button>
      </form>
    </Modal>
  );
}
