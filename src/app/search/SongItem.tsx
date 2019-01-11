import React, { useState } from 'react';
import { observer } from 'mobx-react';
import {
    ListItem,
    Checkbox,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Menu,
    MenuItem,
} from '@material-ui/core';
import { Add, PlayArrow } from '@material-ui/icons';

import SongDetail from './SongDetail';

import { ISong } from '../../interface';

interface SongItemProps {
    song: ISong;
}
interface SongItemState {
    anchorEl: any;
}
class SongItem extends React.Component<SongItemProps, SongItemState> {
    state = {
        anchorEl: null,
    };
    render() {
        const { song } = this.props;
        const { anchorEl } = this.state;
        return (
            <ListItem>
                <Checkbox tabIndex={-1} disableRipple />
                <ListItemText primary={song.name} secondary={<SongDetail song={song} />} />
                <ListItemSecondaryAction>
                    <IconButton aria-label="播放">
                        <PlayArrow />
                    </IconButton>
                    <IconButton
                        aria-label="添加到播放列表"
                        aria-owns={anchorEl ? 'add-menu' : undefined}
                        aria-haspopup="true"
                        onClick={event => this.setState({ anchorEl: event.currentTarget })}
                    >
                        <Add />
                    </IconButton>
                    <Menu id="add-menu" open={!!anchorEl} anchorEl={anchorEl}>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>My account</MenuItem>
                        <MenuItem>Logout</MenuItem>
                    </Menu>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default SongItem;
