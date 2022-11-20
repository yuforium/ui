// tslint:disable
/**
 * Yuforium API Specification
 * Yuforium API specification
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Observable } from 'rxjs';
import { BaseAPI, HttpHeaders, throwIfNullOrUndefined, encodeURI, OperationOpts, RawAjaxResponse } from '../runtime';
import {
    NoteCreateDto,
} from '../models';

export interface GetUserOutboxRequest {
    username: string;
}

export interface GetUserOutboxPageRequest {
    page: number;
    username: string;
}

export interface PostUserOutboxRequest {
    username: string;
    noteCreateDto: NoteCreateDto;
}

/**
 * no description
 */
export class ActivityPubApi extends BaseAPI {

    /**
     */
    getUserOutbox({ username }: GetUserOutboxRequest): Observable<void>
    getUserOutbox({ username }: GetUserOutboxRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    getUserOutbox({ username }: GetUserOutboxRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(username, 'username', 'getUserOutbox');

        return this.request<void>({
            url: '/user/{username}/outbox'.replace('{username}', encodeURI(username)),
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     */
    getUserOutboxPage({ page, username }: GetUserOutboxPageRequest): Observable<void>
    getUserOutboxPage({ page, username }: GetUserOutboxPageRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    getUserOutboxPage({ page, username }: GetUserOutboxPageRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(page, 'page', 'getUserOutboxPage');
        throwIfNullOrUndefined(username, 'username', 'getUserOutboxPage');

        return this.request<void>({
            url: '/user/{username}/outbox/page/{page}'.replace('{page}', encodeURI(page)).replace('{username}', encodeURI(username)),
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     */
    postUserOutbox({ username, noteCreateDto }: PostUserOutboxRequest): Observable<void>
    postUserOutbox({ username, noteCreateDto }: PostUserOutboxRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    postUserOutbox({ username, noteCreateDto }: PostUserOutboxRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(username, 'username', 'postUserOutbox');
        throwIfNullOrUndefined(noteCreateDto, 'noteCreateDto', 'postUserOutbox');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<void>({
            url: '/user/{username}/outbox'.replace('{username}', encodeURI(username)),
            method: 'POST',
            headers,
            body: noteCreateDto,
        }, opts?.responseOpts);
    };

}
