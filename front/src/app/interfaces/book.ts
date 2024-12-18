export interface Book {
    id_book?: number,
    external_id_api: string,
    user_id: number,
    title: string,
    author: string,
    isbn: string,
    number_of_pages: number,
    cover: string,
    publishers: string,
    subject:string,
    favoite?: boolean,
    action?:string
}
