import React from 'react';
import { inject, observer } from 'mobx-react';

import ResultItem from './ResultItem';

import { SearchResult } from '../../stores/SearchStore';

const ResultList = observer(({ results }: { results: SearchResult[] }) => (
    <div>
        {results.map((result: SearchResult) => (
            <ResultItem key={result.title} result={result} />
        ))}
    </div>
));

export default inject(({ searchStore }) => ({ results: searchStore.result }))(ResultList);
