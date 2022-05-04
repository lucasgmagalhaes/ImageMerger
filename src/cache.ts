import { Folder } from "./types";



export namespace cache {
    const KEY = "folders";

    export function getFolders() {
        const foldersString = localStorage.getItem(KEY);
        if (foldersString) {
            return JSON.parse(foldersString);
        }
        return [];
    }

    export function setFolders(folders: Folder[]) {
        localStorage.setItem(KEY, JSON.stringify(folders));
    }
}