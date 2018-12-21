import { Album } from './Album';
import { Singer } from './Singer';

export interface Song {
    id: string | number;
    name: string;
    album: Album;
    singer: Singer;
    duration: number;
}
