import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalComp({
  title,
  setTitle,
  addData,
  handleClose,
  handleOpen,
  open,
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handleOpen}
          style={{ backgroundColor: "lightgreen", color: "black" }}
        >
          + Add Document
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            label="Add title"
            type="text"
            style={{ width: "100%", marginBottom: "20px" }}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="warning" onClick={addData}>
              Add
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalComp;
