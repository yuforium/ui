/**
 * Yuforium
 * Yuforium API specification
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { PersonDtoName } from './personDtoName';
import { ObjectDtoAttributedTo } from './objectDtoAttributedTo';
import { NoteCreateDtoName } from './noteCreateDtoName';
import { NoteCreateDtoContent } from './noteCreateDtoContent';


export interface PersonDto { 
    /**
     * The ID of the user
     */
    id: string;
    type: string;
    attributedTo: ObjectDtoAttributedTo;
    content: NoteCreateDtoContent;
    context: string;
    name?: PersonDtoName;
    published: string;
    to?: NoteCreateDtoName;
    cc?: NoteCreateDtoName;
    bcc?: NoteCreateDtoName;
    audience?: NoteCreateDtoName;
    summary: string;
    preferredUsername: string;
}

