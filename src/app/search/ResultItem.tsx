import React from 'react'
import { observer } from 'mobx-react'
import { CircularProgress, withStyles, WithStyles, createStyles } from '@material-ui/core'

import SongList from './SongList'
import { SearchResult } from '../../stores/SearchStore'

const styles = createStyles({
    resultItem: {
        marginRight: '24px',
        width: '50%',
    },
    header: {
        padding: '0 16px',
    },
})

interface ResultItemProps extends WithStyles<typeof styles> {
    result: SearchResult
}

const ResultItem = observer(({ result, classes }: ResultItemProps) => (
    <div className={classes.resultItem}>
        <div className={classes.header}>
            <h2>{result.title}</h2>
        </div>
        {result.searching && <CircularProgress />}
        <SongList songs={result.songs} />
    </div>
))

export default withStyles(styles)(ResultItem)
