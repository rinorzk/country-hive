import { addCommunity } from "@/base/lib/community";
import React, { FormEvent, useState } from "react";
import Modal from "react-modal";
import styles from "./new-community-modal.module.scss";
import { NewCommunityModalProps } from "./types";

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

export default function NewCommunityModal({
  isOpen,
  onClose,
}: NewCommunityModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("public");

  const handleAddCommunity = async (e: FormEvent) => {
    e.preventDefault();
    try {
      addCommunity(name, type, []);
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
