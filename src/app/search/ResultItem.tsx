import React from 'react';
import { observer } from 'mobx-react';
import { CircularProgress } from '@material-ui/core';

import SongList from './SongList';

import { SearchResult } from '../../stores/SearchStore';

const ResultItem = observer(({ result }: { result: SearchResult }) => (
    <div>
        <h2>{result.title}</h2>
        <div>{result.searching && <CircularProgress />}</div>
        <SongList songs={result.songs} />
    </div>
));

export default ResultItem;
