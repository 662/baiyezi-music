// 歌手
export interface ISinger {
    id: string | number;
    name: string;
}
// 专辑
export interface IAlbum {
    id: string | number;
    name: string;
}
// 歌曲
export interface ISong {
    id: string | number;
    name: string;
    album: IAlbum;
    singer: ISinger[];
    duration: number;
}

// 驱动
export interface IDriver {
    search(keywords: string, page: number, limit: number): Promise<{ list: ISong[]; count: number }>;
    find(id: string | number): Promise<string>;
}
export interface IDriverInstance {
    title:string,
    instance: IDriver;
}

// 歌单中的歌曲
export interface IPlaylistItem {
    driver: string;
    song: ISong;
}

// 歌单
export interface IPlaylist {
    title: string;
    items: IPlaylistItem[];
}
