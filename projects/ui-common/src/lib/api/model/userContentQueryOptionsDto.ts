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


export interface UserContentQueryOptionsDto { 
    /**
     * Comma separated list of Activity Streams object types to include in the response.
     */
    type?: string;
    /**
     * The number of items to skip before returning the remaining items.
     */
    skip?: number;
    /**
     * The maximum number of items to return.
     */
    limit?: number;
    /**
     * The sort order of the returned items.
     */
    sort?: string;
}

