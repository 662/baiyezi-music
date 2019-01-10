import React from 'react';
import { inject, observer } from 'mobx-react';
import { List, ListSubheader } from '@material-ui/core';
import SonglistItem from './SonglistItem';
import { IPlaylist } from '../../interface';

interface PlaylistProps {
    songlists: IPlaylist[];
}

const Playlist = ({ songlists }: PlaylistProps) => {
    return (
        <List subheader={<ListSubheader>我的歌单</ListSubheader>} component="nav">
            {songlists.map((item, i) => (
                <SonglistItem key={item.title} title={item.title} index={i} onClick={e => {}} onDelete={e => {}} />
            ))}
        </List>
    );
};

export default inject(({ songlistStore }) => ({ songlists: songlistStore.songlists }))(Playlist);
