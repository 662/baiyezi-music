import { Song } from '../interface/Song';

export interface Driver {
    search(keywords: string, page: number, limit: number): Promise<{ list: Song[]; count: number }>;
    find(id: string | number): Promise<string>;
}
