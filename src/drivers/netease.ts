import { ISong, IDriver, ISearchResult } from '../interface'
// const cors = `https://cors-anywhere.herokuapp.com/`

export default class Netease implements IDriver {
    static title = '网易'

    async search(keywords: string, page: number, limit: number): Promise<ISearchResult> {
        const offset = (page - 1) * limit
        const response = await fetch(`https://music.163.com/api/cloudsearch/pc?s=${keywords}&type=1&offset=${offset}&limit=${limit}`)
        const { result } = await response.json()
        const { songCount, songs } = result

        const list: ISong[] = songs.map((song: any) => ({
            id: song.id,
            name: song.name,
            album: { id: song.al.id, name: song.al.name },
            singer: song.ar.map((item: any) => ({ id: item.id, name: item.name })),
            duration: song.dt,
            driver: Netease.title,
        }))

        return {
            list,
            total: songCount,
        }
    }
    async find(id: string | number): Promise<string> {
        const response = await fetch(`https://music.163.com/api/song/enhance/player/url?ids=[${id}]&br=320000`)
        const { data } = await response.json()
        return data[0].url
    }
}
