import React from 'react';
import { inject, observer } from 'mobx-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SearchResult } from '../../stores/SearchStore';
import { Song } from '../../interface';

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

const SongList = observer(({ songs }: { songs: Song[] }) => (
    <ul>
        {songs.map((song: Song) => (
            <SongItem key={song.id} song={song} />
        ))}
    </ul>
));

const SongItem = observer(({ song }: { song: Song }) => (
    <li>
        <div>{song.name}</div>
        <div>{song.singer.name}</div>
        <div>{song.album.name}</div>
        <div>{song.duration}</div>
    </li>
));

export default inject(({ searchStore }) => ({ results: searchStore.result }))(ResultList);
