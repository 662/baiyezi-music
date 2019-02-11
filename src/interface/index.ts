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
    driver: string;
}

export interface ISearchResult {
    list: ISong[];
    total: number;
}
// 驱动
export interface IDriver {
    search(keywords: string, page: number, limit: number): Promise<ISearchResult>;
    find(id: string | number): Promise<string>;
}
export interface IDriverInstance {
    title: string;
    instance: IDriver;
}
// 歌单
export interface ISonglist {
    title: string;
    items: ISong[];
}

export type SnackbarVariant = 'success' | 'warning' | 'error' | 'info';
