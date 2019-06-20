import { Content } from './content';
import { Embedded } from './embedded';

export class Post {
    author: number;
    categories: number[];
    commentStatus: string;
    content: Content;
    date: Date;
    dateGmt: Date;
    excerpt: Content;
    featuredMedia: 25103;
    format: string;
    guid: Content;
    id: number;
    link: string;
    meta: any[];
    modified: Date;
    modifiedGmt: Date;
    pingStatus: string;
    slug: string;
    status: string;
    sticky: boolean;
    tags: number[];
    template: string;
    title: Content;
    type: string;
    embedded: Embedded;



    constructor(input: any) {
        Object.assign(this, input);
        this.content = new Content(input.content);
        this.date = new Date(input.date);
        this.commentStatus = input.comment_status;
        this.dateGmt = new Date(input.date_gmt);
        this.excerpt = new Content(input.excerpt);
        this.guid = new Content(input.guid);
        this.featuredMedia = input.featured_media;
        this.modified = new Date(input.modified);
        this.modifiedGmt = new Date(input.modified_gmt);
        this.pingStatus = input.ping_status;
        this.title = new Content(input.title);
        this.embedded = new Embedded(input._embedded);
    }
}
