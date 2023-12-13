import { Injectable } from '@angular/core';
import { Book } from '../api/book';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    private basePath = "books"

    constructor(private db: AngularFireDatabase) { }

    createBook(book: Book): any {
        return this.db.list<Book>(this.basePath).push(book);
    }

    getBooks() {
        return this.db.list<Book>(this.basePath).snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        )
    }

    getBookId(key: string): Observable<Book> {
        return this.db.object<Book>(`${this.basePath}/${key}`).valueChanges();
    }

    updateBook(key: string, value: any): Promise<void> {
        return this.db.object<Book>(`${this.basePath}/${key}`).update(value);
    }

    deleteBook(key: string): Promise<void> {
        return this.db.object<Book>(`${this.basePath}/${key}`).remove();
    }
}
