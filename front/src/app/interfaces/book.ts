export interface Book {
    id?: number,
    external_id_api: string,
    user_id: number,
    title: string,
    author: string,
    isbn: string,
    number_of_pages: number,
    cover: string,
    publishers: string,
    favoite: boolean,
}
