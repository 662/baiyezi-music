import React, { MouseEventHandler } from 'react'
import { ListSubheader, IconButton, ListItemSecondaryAction } from '@material-ui/core'

import DelayTooltip from '../../components/DelayTooltip'
import { Add, Sync } from '@material-ui/icons'

interface SonglistHeaderProps {
    onAdd: MouseEventHandler
    onSync: MouseEventHandler
}

const SonglistHeader = ({ onAdd, onSync }: SonglistHeaderProps) => (
    <ListSubheader>
        <span>我的歌单</span>
        <ListItemSecondaryAction>
            <DelayTooltip title="同步">
                <IconButton onClick={onSync}>
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

export default SonglistHeader
