import { Component, OnInit } from '@angular/core';
import { Book } from '../../../../demo/api/book';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BookService } from '../../../../demo/service/book.service';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {

    bookDialog: boolean = false;

    deleteBookDialog: boolean = false;

    deleteBooksDialog: boolean = false;

    books: Book[] = [];

    book: Book = {};

    selectedBooks: Book[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private bookService: BookService, private messageService: MessageService) { }

    ngOnInit() {
        this.bookService.getBooks().subscribe(data => this.books = data);

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'genre', header: 'Genre' },
            { field: 'subgenre', header: 'Subgenre' },
            { field: 'subgenre', header: 'Subgenre' },
            { field: 'author', header: 'Author' },
            { field: 'language', header: 'Langugage' },
            { field: 'description', header: 'description' },
        ];

    }

    openNew() {
        this.book = {};
        this.submitted = false;
        this.bookDialog = true;
    }

    deleteSelectedBooks() {
        this.deleteBooksDialog = true;
    }

    editBook(book: Book) {
        this.book = { ...book };
        this.bookDialog = true;
    }

    deleteBook(book: Book) {
        this.deleteBookDialog = true;
        this.book = { ...book };
    }

    confirmDeleteSelected() {
        this.deleteBooksDialog = false;
        this.bookService.deleteBook(this.book.key);

        for (let book of this.selectedBooks) {
            this.bookService.deleteBook(book.key);
        }

        // this.books = this.books.filter(val => !this.bookService.deleteBook(val.key));

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Books Deleted', life: 3000 });
        this.selectedBooks = [];
    }

    confirmDelete() {
        this.deleteBookDialog = false;
        // this.books = this.books.filter(val => val.id !== this.book.id);
        this.bookService.deleteBook(this.book.key);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Book Deleted', life: 3000 });
        this.book = {};
    }

    hideDialog() {
        this.bookDialog = false;
        this.submitted = false;
    }

    saveBook() {
        this.submitted = true;

        if (this.book.name?.trim()) {
            if (this.book.id) {
                // @ts-ignore
                // this.books[this.findIndexById(this.book.id)] = this.book;
                this.bookService.updateBook(this.book.key, this.book);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Book Updated', life: 3000 });
            } else {
                this.book.id = this.createId();
                this.bookService.createBook(this.book);
                // @ts-ignore
                // this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Book Created', life: 3000 });
            }

            this.books = [...this.books];
            this.bookDialog = false;
            this.book = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
