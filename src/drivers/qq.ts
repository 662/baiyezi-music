import { ISong, IDriver, ISearchResult } from '../interface'
// const cors = `https://cors-anywhere.herokuapp.com/`

export default class QQ implements IDriver {
    static title = 'QQ'

    async search(keywords: string, page: number, limit: number): Promise<ISearchResult> {
        const response = await fetch(
            `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?p=${page}&n=${limit}&w=${keywords}&format=json&new_json=1&cr=1`
        )
        const { data } = await response.json()
        const { totalnum, list } = data.song

        const songs: ISong[] = list.map((song: any) => ({
            id: song.mid,
            name: song.name,
            album: { id: song.album.id, name: song.album.name },
            singer: song.singer.map((item: any) => ({ id: item.id, name: item.name })),
            duration: song.interval * 1000,
            driver: QQ.title,
        }))

        return {
            list: songs,
            total: totalnum,
        }
    }
    async find(id: string | number): Promise<string> {
        return `https://api.bzqll.com/music/tencent/url?key=579621905&id=${id}&br=320`
    }
}
