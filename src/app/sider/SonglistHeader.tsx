import React, { MouseEventHandler } from 'react'
import { ListSubheader, IconButton, ListItemSecondaryAction } from '@material-ui/core'

import DelayTooltip from '../../components/DelayTooltip'
import { Add } from '@material-ui/icons'

interface SonglistHeaderProps {
    onAdd: MouseEventHandler
}

const SonglistHeader = ({ onAdd }: SonglistHeaderProps) => (
    <ListSubheader>
        <span>我的歌单</span>
        <ListItemSecondaryAction>
            <DelayTooltip title="新建歌单">
                <IconButton onClick={onAdd}>
                    <Add fontSize="small" />
                </IconButton>
            </DelayTooltip>
        </ListItemSecondaryAction>
    </ListSubheader>
)

export default SonglistHeader
