import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { WithId } from 'src/app/types/type-script';

const mapDataToBody = <D extends WithId>(data: D[]): Record<string, D> =>{
    return data.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {});
};

const mapBodyToData = <D extends WithId>(value: Record<string, D>): D[] => {
    return Object.values(value);
};

@Injectable()
export default class DataStorageService {

    private readonly ContextPath = 'http://localhost:3000/ng-course-recipe-book';

    constructor(private readonly client: HttpClient) {}

    buildUrl(relativePath: string): string {
        return `${this.ContextPath}/${relativePath}`
    }

    fetch<D extends WithId>(collectionName: string): Observable<D[]> {
        return this.client.get<Record<string, D>>(this.buildUrl(collectionName)).pipe(
            tap((body) => console.debug('Fetch response body:' + JSON.stringify(body))),
            map(mapBodyToData)
        );
    }

    store<D extends WithId>(collectionName: string, data: D[]): Observable<D[]> {
        const body = mapDataToBody(data);
        return this.client.post<Record<string, D>>(this.buildUrl(collectionName), body).pipe(
            tap((body) => console.debug('Store response body:' + JSON.stringify(body))),
            map(mapBodyToData)
        );
    }
}