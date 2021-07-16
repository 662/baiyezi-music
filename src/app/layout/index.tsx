import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { withStyles, createStyles } from '@material-ui/core'
import { WithStyles, Theme } from '@material-ui/core'
import Sider from '../sider'
import Player from '../player'
import { SnackbarInjected } from '../injected-components'

const styles = (theme: Theme) =>
    createStyles({
        wrapper: {
            minWidth: '960px',
        },
        main: {
            display: 'flex',
        },
        sidebar: {
            position: 'fixed',
            width: '240px',
            height: 'calc(100vh - 67px)',
            borderRight: 'solid 1px #ddd',
            backgroundColor: '#ffffff',
        },
        content: { width: '100%', padding: '24px 24px 0 24px', marginLeft: '240px', marginBottom: '48px' },
        player: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            minWidth: '960px',
        },
    })

interface LayoutProps extends WithStyles<typeof styles> {
    children: React.ReactChild | React.ReactChild[]
}
class Layout extends React.Component<LayoutProps> {
    render() {
        const { children, classes } = this.props
        return (
            <div className={classes.wrapper}>
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
        )
    }
}

export default withStyles(styles)(Layout)
