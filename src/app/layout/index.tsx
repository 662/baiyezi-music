import React from 'react';
import { CssBaseline, Snackbar } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core';
import { WithStyles, Theme } from '@material-ui/core';
import Sider from '../sider';
import Player from '../player';

const styles = (theme: Theme) =>
    createStyles({
        main: {
            display: 'flex',
        },
        sidebar: {
            position: 'fixed',
            width: '240px',
            height: 'calc(100vh - 48px)',
            borderRight: 'solid 1px #ddd',
        },
        content: { width: '100%', padding: '24px 24px 0 24px', marginLeft: '240px', marginBottom: '48px' },
        player: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            height: '48px',
            width: '100%',
        },
    });

interface LayoutProps extends WithStyles<typeof styles> {
    children: React.ReactChild;
}

const Layout = ({ children, classes }: LayoutProps) => {
    return (
        <div>
            <CssBaseline />
            <div className={classes.main}>
                <div className={classes.sidebar}>
                    <Sider />
                </div>
                <div className={classes.content}>{children}</div>
            </div>
            <div className={classes.player}>
                <Player />
            </div>
            {/* <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Note archived</span>}
                action={[
                    <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                        UNDO
                    </Button>,
                    <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={this.handleClose}>
                        <CloseIcon />
                    </IconButton>,
                ]}
            /> */}
        </div>
    );
};

export default withStyles(styles)(Layout);
