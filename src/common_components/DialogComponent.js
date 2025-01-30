import React from "react";
import Dialog from '@mui/material/Dialog';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";

const DialogComponent = ({open, closeFunction, proceedFunction}) => {
    return (
        <Dialog open={open} onClose={closeFunction} disableBackdropClick={true} disableEscapeKeyDown={true}>
                <DialogTitle className="font-semibold">Feedback</DialogTitle>
                <DialogContent>
                <p>Please provide feedback for the generated output</p>
                </DialogContent>
                <DialogActions className="justify-center" style={{ justifyContent: "center", marginBottom: "12px" }}>
                {/* Accept Button */}
                <Button
                    onClick={() => proceedFunction("Accept")}
                    color="success"
                    variant="text"
                    startIcon={<ThumbUpIcon />}
                >
                    Accept
                </Button>
                
                {/* Reject Button */}
                <Button
                    onClick={() => proceedFunction("Reject")}
                    color="error"
                    variant="text"
                    startIcon={<ThumbDownIcon />}
                >
                    Reject
                </Button>
                </DialogActions>
            </Dialog>
    );
}

export default DialogComponent;