import React from 'react';
import { inject } from 'mobx-react';
import { CssBaseline } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core';
import { WithStyles, Theme } from '@material-ui/core';
import Sider from '../sider';
import Player from '../player';
import { SnackbarInjected } from '../injected-components';
import SnackbarStore from '../../stores/SnackbarStore';

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
    snackbarStore: SnackbarStore;
}

class Layout extends React.Component<LayoutProps> {
    componentDidMount() {
        // window.onerror = (event: Event | string, source?: string, fileno?: number, columnNumber?: number, error?: Error) => {
        //     // this.props.snackbarStore.error(error!.message);
        //     // return true;
        // };
    }
    render() {
        const { children, classes } = this.props;
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
                <SnackbarInjected />
            </div>
        );
    }
}

const LayoutStyled = withStyles(styles)(Layout);
export default inject(({ snackbarStore }) => ({ snackbarStore }))(LayoutStyled);
