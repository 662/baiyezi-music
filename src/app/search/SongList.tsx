import React from 'react';
import { List } from '@material-ui/core';

import { SongItemInjected } from '../injected-components';
import { ISong } from '../../interface';

const SongList = ({ songs }: { songs: ISong[] }) => (
    <List>
        {songs.map((song: ISong) => (
            <SongItemInjected hideDriver={true} key={song.id + song.driver} song={song} />
        ))}
    </List>
);

export default SongList;
