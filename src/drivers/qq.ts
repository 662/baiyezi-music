import { Song, Driver } from '../interface';
import { string } from 'prop-types';

export default class QQ implements Driver {
    static title = 'QQ';

    async search(keywords: string, page: number, limit: number): Promise<{ list: Song[]; count: number }> {
        const response = await fetch(
            `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?p=${page}&n=${limit}&w=${keywords}&format=json&new_json=1&cr=1`
        );
        const { data } = await response.json();
        const { totalnum, list } = data.song;

        const songs: Song[] = list.map((song: any) => ({
            id: song.mid,
            name: song.name,
            album: { id: song.album.id, name: song.album.name },
            singer: song.singer.map((item: any) => ({ id: item.id, name: item.name })),
            duration: song.interval * 1000,
        }));

        return {
            list: songs,
            count: totalnum,
        };
    }
    async find(id: string | number): Promise<string> {
        return `https://api.bzqll.com/music/tencent/url?key=579621905&id=${id}&br=320`;
    }
}
