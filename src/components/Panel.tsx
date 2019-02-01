import React from 'react';
import { withStyles, createStyles } from '@material-ui/core';
import { WithStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) =>
    createStyles({
        header: {
            marginBottom: '16px',
        },
        title: {
            fontSize: '24px',
        },
        actions: {},
    });

interface PanelProps extends WithStyles<typeof styles> {
    title: string | React.ReactNode;
    actions?: React.ReactNode;
    children: React.ReactNode;
}

const Panel = ({ title, children, classes, actions }: PanelProps) => (
    <div>
        <div className={classes.header}>
            <div className={classes.title}>{title}</div>
            <div className={classes.actions}>{actions}</div>
        </div>
        <div>{children}</div>
    </div>
);

export default withStyles(styles)(Panel);
