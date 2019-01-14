import React from 'react';
import { inject } from 'mobx-react';
import { ISong } from '../../interface';

interface PlaylistProps {
    songs: ISong[];
}
class Playlist extends React.Component<PlaylistProps> {
    render() {
        const { songs } = this.props;
        return (
            <div>
                {songs.map(item => (
                    <div key={item.id}>{JSON.stringify(item)}</div>
                ))}
            </div>
        );
    }
}

export default inject(({ playlistStore }) => ({ songs: playlistStore.songs }))(Playlist);
