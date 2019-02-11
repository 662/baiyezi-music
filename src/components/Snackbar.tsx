import React from 'react';
import classNames from 'classnames';
import { Snackbar as MSnackbar, IconButton } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core';
import { Theme, WithStyles } from '@material-ui/core';
import { Close, CheckCircle, Warning, Error as ErrorIcon, Info } from '@material-ui/icons';
import { green, amber } from '@material-ui/core/colors';
import { SnackbarVariant } from '../interface';

const styles = (theme: Theme) =>
    createStyles({
        success: {
            backgroundColor: green[600],
        },
        error: {
            backgroundColor: theme.palette.error.dark,
        },
        info: {
            backgroundColor: theme.palette.primary.dark,
        },
        warning: {
            backgroundColor: amber[700],
        },
        icon: {
            fontSize: 20,
        },
        iconVariant: {
            opacity: 0.9,
            marginRight: theme.spacing.unit,
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
    });

const variantIcon = {
    success: CheckCircle,
    warning: Warning,
    error: ErrorIcon,
    info: Info,
};

interface SnackbarProps extends WithStyles<typeof styles> {
    key: number;
    open: boolean;
    message: string;
    onClose(): void;
    onExited(): void;
    variant: SnackbarVariant;
}

const Snackbar = ({ key, open, message, onClose, variant, classes, onExited }: SnackbarProps) => {
    const Icon = variantIcon[variant];
    return (
        <MSnackbar
            key={key}
            ContentProps={{ className: classes[variant] }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={(event, reason) => {
                if (reason === 'clickaway') return;
                onClose();
            }}
            onExited={onExited}
            message={
                <span className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
                    <Close className={classes.icon} />
                </IconButton>,
            ]}
        />
    );
};

export default withStyles(styles)(Snackbar);
