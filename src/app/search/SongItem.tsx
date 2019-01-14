import React, { MouseEventHandler } from 'react';
import { inject } from 'mobx-react';
import { Typography, Divider, ListItemIcon, ListItem, ListItemText, ListItemSecondaryAction, IconButton, MenuItem, Fab, Menu, withStyles, createStyles, WithStyles, Theme } from '@material-ui/core';
import { Add, PlayArrow } from '@material-ui/icons';
import DelayTooltip from '../../components/DelayTooltip';

import PlaylistStore from '../../stores/PlaylistStore';
import SonglistStore from '../../stores/SonglistStore';
import SongDetail from './SongDetail';
import { ISong } from '../../interface';

const styles = (theme: Theme) =>
    createStyles({
        listitem: {
            cursor: 'default',
            borderBottom: 'dashed 1px #ddd',
        },
    });

interface SongItemProps extends WithStyles<typeof styles> {
    song: ISong;
    playlistStore: PlaylistStore;
    songlistStore: SonglistStore;
}
interface SongItemState {
    menu: boolean;
}
class SongItem extends React.Component<SongItemProps, SongItemState> {
    state = {
        menu: false,
    };
    anchorEl: any = null;

    handleAdd: MouseEventHandler = e => this.setState({ menu: true });
    handleCloseMenu = () => this.setState({ menu: false });
    handlePlay: MouseEventHandler = e => {
        const { playlistStore, song } = this.props;
        playlistStore.add(song, true);
    };
    handleAddToPlaylist = (song: ISong) => {
        this.props.playlistStore.add(song);
        this.handleCloseMenu();
    };
    handleAddToSonglist = (title: string, song: ISong) => {
        this.props.songlistStore.pushSonglist(title, song);
        this.handleCloseMenu();
    };

    render() {
        const { song, classes, songlistStore } = this.props;
        const { menu } = this.state;

        return (
            <ListItem ContainerProps={{ className: classes.listitem }}>
                <ListItemIcon>
                    <DelayTooltip title="播放">
                        <Fab size="small" onClick={this.handlePlay}>
                            <PlayArrow />
                        </Fab>
                    </DelayTooltip>
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant="inherit" noWrap>
                            {song.name}
                        </Typography>
                    }
                    secondary={<SongDetail song={song} />}
                />
                <ListItemSecondaryAction>
                    <IconButton buttonRef={node => (this.anchorEl = node)} onClick={this.handleAdd}>
                        <Add fontSize="small" />
                    </IconButton>
                    <Menu open={menu} anchorEl={this.anchorEl} onClose={this.handleCloseMenu}>
                        <MenuItem onClick={e => this.handleAddToPlaylist(song)}>播放列表</MenuItem>
                        <Divider />
                        {songlistStore.songlists.map(item => (
                            <MenuItem key={item.title} onClick={e => this.handleAddToSonglist(item.title, song)}>
                                {item.title}
                            </MenuItem>
                        ))}
                    </Menu>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

const SongItemStyled = withStyles(styles)(SongItem);
export default inject(({ playlistStore, songlistStore }) => ({ playlistStore, songlistStore }))(SongItemStyled);
