import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LocalStorageService {
    public storage = localStorage;
    
    constructor() { }

    public store(key: string, value: any): void {
        this.storage.setItem(key, value);
    }

    public remove(key: string): void {
        this.storage.removeItem(key);
    }

    public get(key: string): any {
        this.storage.getItem(key);
    }
}
