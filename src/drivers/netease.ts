import { Song, Driver } from '../interface';
import { string } from 'prop-types';

export default class Netease implements Driver {
    static title = '网易';

    async search(keywords: string, page: number, limit: number): Promise<{ list: Song[]; count: number }> {
        const offset = (page - 1) * limit;
        const response = await fetch(
            `http://music.163.com/api/cloudsearch/pc?s=${keywords}&type=1&offset=${offset}&limit=${limit}`
        );
        const { result } = await response.json();
        const { songCount, songs } = result;

        const list: Song[] = songs.map((song: any) => ({
            id: song.id,
            name: song.name,
            album: { id: song.al.id, name: song.al.name },
            singer: song.ar.map((item: any) => ({ id: item.id, name: item.name })),
            duration: song.dt,
        }));

        return {
            list,
            count: songCount,
        };
    }
    async find(id: string | number): Promise<string> {
        const response = await fetch(`http://music.163.com/api/song/enhance/player/url?ids=[${id}]&br=320000`);
        const { data } = await response.json();
        return data[0].url;
    }
}
