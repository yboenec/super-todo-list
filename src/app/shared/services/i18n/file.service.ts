import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * File service
 * Allow to upload file to read it
 */
@Injectable()
export class FileService {

    /**
     * Default constructor
     * @param http 
     */
    constructor(private http:HttpClient) {
    }

    /**
     * Request the needed file
     * @param path 
     */
    private uploadFile(path: string): void {
        return this.http.get(path);
    }
}