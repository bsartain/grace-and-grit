"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ScheduleModal: React.FC<{ label: string; classForScheduleButton: string }> = ({ label, classForScheduleButton }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className={classForScheduleButton} onClick={handleShow} type="button">
        {label}
      </button>

      <Modal show={show} onHide={handleClose} size="lg" className="schedule-modal">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <iframe src="https://brettsartain.youcanbook.me/?embed=true" className="schedule-iframe" loading="lazy"></iframe>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ScheduleModal;
