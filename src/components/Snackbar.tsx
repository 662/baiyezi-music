import React from 'react';
import { Snackbar as MSnackbar } from '@material-ui/core';

interface SnackbarProps {
    open: boolean;
}

const Snackbar = ({ open }: SnackbarProps) => (
    <MSnackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        // onClose={this.handleClose}
        ContentProps={{
            'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Note archived</span>}
        action={
            [
                // <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                //     UNDO
                // </Button>,
                // <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={this.handleClose}>
                //     <CloseIcon />
                // </IconButton>,
            ]
        }
    />
);

export { Snackbar };
