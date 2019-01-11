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

export default SongDetail;
