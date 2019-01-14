import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
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
        </div>
    );
};

export default withStyles(styles)(Layout);
