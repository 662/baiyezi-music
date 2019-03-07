import React from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { WithStyles } from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'

import ResultItem from './ResultItem'
import { SearchResult } from '../../stores/SearchStore'

const styles = (theme: Theme) =>
    createStyles({
        resultList: {
            display: 'flex',
        },
    })

interface ResultListProps extends WithStyles<typeof styles> {
    results: SearchResult[]
}

const ResultList = ({ results, classes }: ResultListProps) => (
    <div className={classes.resultList}>
        {results.map((result: SearchResult) => (
            <ResultItem key={result.title} result={result} />
        ))}
    </div>
)

const ObserverResultList = observer(ResultList)
const StyledObserverResultList = withStyles(styles)(ObserverResultList)
export default inject(({ searchStore }) => ({ results: searchStore.result }))(StyledObserverResultList)
