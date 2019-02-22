import React from 'react';
import { observer } from 'mobx-react';
import { withStyles, createStyles, Typography, WithStyles, Theme } from '@material-ui/core';
import Duration from './Duration';

import { ISong } from '../interface';

const styles = (theme: Theme) =>
    createStyles({
        songDetail: {
            '& b': {
                fontWeight: 'normal',
            },
            '& i,& small': {
                marginLeft: '8px',
            },
        },
    });

interface SongDetailProps extends WithStyles<typeof styles> {
    song: ISong;
}

const SongDetail = withStyles(styles)(
    observer(({ song, classes }: SongDetailProps) => (
        <Typography variant="inherit" noWrap className={classes.songDetail}>
            <b>{song.singer.map(s => s.name).join('&')}</b>
            <Duration value={song.duration} />
            {song.album.name && <i title={`《${song.album.name}》`}>《{song.album.name}》</i>}
        </Typography>
    ))
);

export default SongDetail;
