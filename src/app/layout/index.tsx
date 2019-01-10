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
            width: '240px',
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
                <div>{children}</div>
            </div>
            <div>
                <Player />
            </div>
        </div>
    );
};

export default withStyles(styles)(Layout);
