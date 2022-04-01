import { Box, Modal, Fade, Alert, AlertTitle } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notesCloseModalAction } from "../Actions/notes";

export const ModalMsg = () => {
  const { saveNote } = useSelector((state) => state.notes);
  const { isSave, message, title } = saveNote;
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(notesCloseModalAction());
  };
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (isSave && message !== "Error to save note") setOpenModal(true);
    else if (!isSave && message === "Error to save note") setOpenModal(true);
  }, [isSave, message]);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
      >
        <Fade in={openModal}>
          <Box className="notes__modal">
            <Alert severity={isSave ? "success" : "error"} variant="outlined">
              <AlertTitle severity={isSave ? "success" : "error"}>
                <strong>{title}</strong>
              </AlertTitle>
              {message}
            </Alert>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
