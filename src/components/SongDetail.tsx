import React from 'react';
import { observer } from 'mobx-react';
import { withStyles, createStyles, Typography, WithStyles, Theme } from '@material-ui/core';

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

const Duration = ({ value }: { value: number }) => {
    function full(v: number) {
        return v < 10 ? '0' + v : v;
    }
    const dateTime = new Date(value);
    const m = dateTime.getMinutes();
    const s = dateTime.getSeconds();
    const time = full(m) + ':' + full(s);
    return <small>{time}</small>;
};
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
