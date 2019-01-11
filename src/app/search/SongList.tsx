import React from 'react';
import { observer } from 'mobx-react';
import { List } from '@material-ui/core';

import SongItem from './SongItem';

import { ISong } from '../../interface';

const SongList = observer(({ songs }: { songs: ISong[] }) => (
    <List>
        {songs.map((song: ISong) => (
            <SongItem key={song.id} song={song} />
        ))}
    </List>
));

export default SongList;
