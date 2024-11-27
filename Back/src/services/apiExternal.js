
const loadApilibrary = async(search) => {
    const endpoint = `http://openlibrary.org/search.json?q=${search}&fields=key,title,author_name,editions,cover_edition_key`
    
    try {
        console.log("este es el enpoint",endpoint)
        const response = await fetch(endpoint);

        if(!response.ok){
            throw new Error('Error al ejecutar la api')
        }

        const data = await response.json();
        console.log(data);

        const books = data.docs.map((book)=>({
            key:book.key,
            title:book.title,
            author:Array.isArray(book.author_name) ? book.author_name.join(", "): book.author_name,
            editions:book.editions?.docs || [], //books
            cover:book.cover_edition_key,
        }))
        console.log('libros conseguidos', books)


            for(const book of books){
                if(book.editions.length > 0){
                    for(const edition of book.editions){
                        const bookDetailEndpoint = `http://openlibrary.org/${edition.key}.json`;
                        try {
                            const detailResponse = await fetch(bookDetailEndpoint);
                            if(!detailResponse.ok){
                                throw new Error(`Error al ejecutar la api book ${edition.key}`)
                            }
                            const editionDetails = await detailResponse.json();
                            console.log(`los detales de la edicion son ${edition.key}`,editionDetails);
                            book.number_of_pages = editionDetails.number_of_pages
                            
                            //iteracion isbn
                            const isbn10 = editionDetails.isbn_10 ? editionDetails.isbn_10.join(", ") : '';  // Unimos los valores de isbn_10
                            const isbn13 = editionDetails.isbn_13 ? editionDetails.isbn_13.join(", ") : '';  // Unimos los valores de isbn_13
                            // Concatenamos isbn_10 e isbn_13, separándolos por una coma si ambos existen
                            book.isbn = `${isbn10 ? isbn10 : ''}${(isbn10 && isbn13) ? ', ' : ''}${isbn13 ? isbn13 : ''}`;
                            book.publishers = editionDetails.publishers ? editionDetails.publishers.join(", "): ''

                        } catch (error) {
                            console.log(`error al cargar los detalles`,error)
                        }
                    }       
                }
            }
            return books
    } catch (error) {
        console.log(error)
    }
}

export default loadApilibrary
