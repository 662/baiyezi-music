import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { RouteChildrenProps } from 'react-router';
import { List, IconButton, Button } from '@material-ui/core';
import { Delete, PlayArrow, Add } from '@material-ui/icons';

import Panel from '../../components/Panel';
import { SongItemInjected } from '../injected-components';
import { ISonglist, ISong } from '../../interface';

interface SonglistProps extends RouteChildrenProps<{ title: string }> {
    songlists: ISonglist[];
    onPlayAll(songs: ISong[]): void;
    onAddToPlaylist(songs: ISong[]): void;
    onRemove(title: string, driver: string, id: string | number): void;
}

@observer
class Songlist extends React.Component<SonglistProps> {
    getSonglist = () => {
        const { songlists, match } = this.props;
        const songlist = songlists.find(item => item.title === match!.params.title)!;
        return songlist;
    };
    handlePlayAllClick: React.MouseEventHandler = () => {
        const songlist = this.getSonglist();
        this.props.onPlayAll(songlist.items);
    };
    handleAddToPlaylistClick: React.MouseEventHandler = () => {
        const songlist = this.getSonglist();
        this.props.onAddToPlaylist(songlist.items);
    };

    render() {
        console.log(1);
        const { onRemove } = this.props;
        const songlist = this.getSonglist();
        return (
            <Panel
                title={songlist.title}
                actions={[
                    <Button key="playAll" variant="contained" size="small" onClick={this.handlePlayAllClick}>
                        <PlayArrow fontSize="small" />
                        全部播放
                    </Button>,
                    <Button key="addToPlaylist" variant="contained" size="small" onClick={this.handleAddToPlaylistClick}>
                        <Add fontSize="small" />
                        加入播放列表
                    </Button>,
                ]}
            >
                {songlist.items.length === 0 ? (
                    <div>
                        暂无歌曲，去<Link to="/search">添加</Link>
                    </div>
                ) : (
                    <List>
                        {songlist.items.map(song => (
                            <SongItemInjected
                                key={song.id + song.driver}
                                song={song}
                                extendAction={
                                    <IconButton onClick={e => onRemove(songlist.title, song.driver, song.id)}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                }
                            />
                        ))}
                    </List>
                )}
            </Panel>
        );
    }
}

export default inject(({ songlistStore, playlistStore }) => ({
    songlists: songlistStore.songlists,
    onPlayAll: (songs: ISong[]) => playlistStore.append(songs, true),
    onAddToPlaylist: (songs: ISong[]) => playlistStore.append(songs, false),
    onRemove: (title: string, driver: string, id: string | number) => songlistStore.popSonglist(title, driver, id),
}))(Songlist);
