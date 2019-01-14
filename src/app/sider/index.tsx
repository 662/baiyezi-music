import React from 'react';
import { Divider, withStyles, WithStyles, createStyles } from '@material-ui/core';

import Songlist from './Songlist';
import Menu from './Menu';

const styles = createStyles({
    sider: {},
});

interface SiderProps extends WithStyles<typeof styles> {}

const Sider = ({ classes }: SiderProps) => (
    <div className={classes.sider}>
        <Menu />
        <Divider />
        <Songlist />
    </div>
);

export default withStyles(styles)(Sider);
