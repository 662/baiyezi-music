import React, { MouseEventHandler } from 'react'
import { ListSubheader, IconButton, ListItemSecondaryAction } from '@material-ui/core'
import { createStyles, withStyles } from '@material-ui/core'
import { WithStyles } from '@material-ui/core'

import DelayTooltip from '../../components/DelayTooltip'
import { Add, Sync } from '@material-ui/icons'

const styles = createStyles({
    '@keyframes rotate': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
    },
    syncing: {
        animation: `rotate 1s linear 0s infinite`,
    },
})

interface SonglistHeaderProps extends WithStyles<typeof styles> {
    onAdd: MouseEventHandler
    onSync: MouseEventHandler
    syncing: boolean
}

const SonglistHeader = ({ onAdd, onSync, syncing, classes }: SonglistHeaderProps) => (
    <ListSubheader>
        <span>我的歌单</span>
        <ListItemSecondaryAction>
            <DelayTooltip title="同步">
                <IconButton onClick={onSync} className={syncing ? classes.syncing : ''}>
                    <Sync fontSize="small" />
                </IconButton>
            </DelayTooltip>
            <DelayTooltip title="新建歌单">
                <IconButton onClick={onAdd}>
                    <Add fontSize="small" />
                </IconButton>
            </DelayTooltip>
        </ListItemSecondaryAction>
    </ListSubheader>
)

export default withStyles(styles)(SonglistHeader)
