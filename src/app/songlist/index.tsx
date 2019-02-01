import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { RouteChildrenProps } from 'react-router';
import { List, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import Panel from '../../components/Panel';
import { SongItemInjected } from '../injected-components';
import { ISonglist, ISong } from '../../interface';

interface SonglistProps extends RouteChildrenProps<{ title: string }> {
    songlists: ISonglist[];
    onRemove(title: string, driver: string, id: string | number): void;
}

@observer
class Songlist extends React.Component<SonglistProps> {
    render() {
        const { songlists, match, onRemove } = this.props;
        const songlist = songlists.find(item => item.title === match!.params.title)!;
        return (
            <Panel title={songlist.title}>
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

export default inject(({ songlistStore }) => ({
    songlists: songlistStore.songlists,
    onRemove: (title: string, driver: string, id: string | number) => songlistStore.popSonglist(title, driver, id),
}))(Songlist);
