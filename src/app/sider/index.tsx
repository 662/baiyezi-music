import React from 'react'
import { Divider, withStyles, WithStyles, createStyles } from '@material-ui/core'

import Songlist from './Songlist'
import Menu from './Menu'

const styles = createStyles({
    sider: {},
    divider: {
        backgroundColor: '#ddd',
    },
})

const Sider = ({ classes }: WithStyles<typeof styles>) => (
    <div className={classes.sider}>
        <Menu />
        <Divider className={classes.divider} />
        <Songlist />
    </div>
)

export default withStyles(styles)(Sider)
