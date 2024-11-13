export type Pagination = {
    offset: number;
    limit: number;
};

export enum BlogPostType {
    BlogPost = 1,
    PrivacyPolicy = 2,
    About = 3,
}