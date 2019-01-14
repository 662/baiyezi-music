import React from 'react';
import { inject } from 'mobx-react';
import { RouteChildrenProps } from 'react-router';
import { ISonglist } from '../../interface';

interface SonglistProps extends RouteChildrenProps<{ title: string }> {
    songlists: ISonglist[];
}
class Songlist extends React.Component<SonglistProps> {
    render() {
        const { songlists, match } = this.props;
        const songlist = songlists.find(item => item.title === match!.params.title);
        return <div>{JSON.stringify(songlist)}</div>;
    }
}

export default inject(({ songlistStore }) => ({ songlists: songlistStore.songlists }))(Songlist);
