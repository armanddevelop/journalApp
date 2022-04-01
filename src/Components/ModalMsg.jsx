import { Box, Modal, Typography, Fade } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notesCloseModalAction } from "../Actions/notes";

export const ModalMsg = () => {
  const { saveNote } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(notesCloseModalAction());
    setOpenModal(false);
  };
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (saveNote) setOpenModal(true);
  }, [saveNote]);
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
            <Typography
              className="notes__modal-modal-title"
              variant="h6"
              component="h2"
            >
              Note Saved :)
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
