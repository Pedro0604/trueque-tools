import {Alert, Slide, Snackbar} from "@mui/material";
import {useState} from "react";

export default function InformationBanner({children, severity = 'success', autoHideDuration = 6000}) {
    const [open, setOpen] = useState(true);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            open={children && open}
            TransitionComponent={Slide}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{width: '100%'}}
            >
                {children}
            </Alert>
        </Snackbar>
    )
}
