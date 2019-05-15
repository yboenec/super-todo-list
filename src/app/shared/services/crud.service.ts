import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListDto} from '../model/listDto';
import { map } from 'rxjs/operators';

/**
 * CrudService to allow user to make all crud actions on a T object
 * @date 21/02/2019
 * @author Boenec Yann
 */
export class CrudService<T> {
  constructor(private http: HttpClient, private apiUrl: string) {
  }
  /**
   * Common function to create a T object
   * @param resourceName Resource to create
   * @param data Data to send
   * @return Observable of a T object
   */
  public create(resourceName: string|number, data: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${resourceName}`, data);
  }

  /**
   * Common function to update a T object
   * @param id Id of the resource
   * @param data Data to send
   * @return Observable of a T object
   */
  public update(id: number, data: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Common function to delete a T object
   * @param id Id of the resource
   * @return Observable of a void object
   */
  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Common function to get a T object
   * @param id Id of the resource
   * @return Observable of a T object
   */
  public get(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  /**
   * Common function to get a list of T object
   */
  public list(): Observable<Array<T>> {
    return this.http.get<Array<T>>(`${this.apiUrl}/list`);
  }
}
