import React from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles, StyleRulesCallback } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import {
    List,
    ListItem,
    Checkbox,
    ListSubheader,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    CircularProgress,
} from '@material-ui/core';
import { Add, PlayArrow } from '@material-ui/icons';

import { SearchResult } from '../../stores/SearchStore';
import { ISong } from '../../interface';

const styles: StyleRulesCallback = theme => ({
    songDetail: {
        display: 'flex',
    },
});

const ResultList = observer(({ results }: { results: SearchResult[] }) => (
    <div>
        {results.map((result: SearchResult) => (
            <ResultItem key={result.title} result={result} />
        ))}
    </div>
));

const ResultItem = observer(({ result }: { result: SearchResult }) => (
    <div>
        <h2>{result.title}</h2>
        <div>{result.searching && <CircularProgress />}</div>
        <SongList songs={result.songs} />
    </div>
));

const SongList = observer(({ songs }: { songs: ISong[] }) => (
    <List>
        {songs.map((song: ISong) => (
            <SongItem key={song.id} song={song} />
        ))}
    </List>
));

interface SongDetailProps extends WithStyles<typeof styles> {
    song: ISong;
}
const SongDetail = withStyles(styles)(
    observer(({ song, classes }: SongDetailProps) => (
        <span className={classes.songDetail}>
            <b>{song.singer.map(s => s.name).join(',')}</b>
            <i>《{song.album.name}》</i>
            <small>{song.duration}</small>
        </span>
    ))
);
const SongItem = observer(({ song }: { song: ISong }) => (
    <ListItem>
        <Checkbox tabIndex={-1} disableRipple />
        <ListItemText primary={song.name} secondary={<SongDetail song={song} />} />
        <ListItemSecondaryAction>
            <IconButton aria-label="Play">
                <PlayArrow />
            </IconButton>
            <IconButton aria-label="Add">
                <Add />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
));

export default inject(({ searchStore }) => ({ results: searchStore.result }))(ResultList);
