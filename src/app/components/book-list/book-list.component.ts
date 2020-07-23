import {Component, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';
import {ToastrService} from 'ngx-toastr';
import {el} from '@angular/platform-browser/testing/src/browser_util';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = this.bookService.result;

  constructor(
    private bookService: BookService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {

    this.bookService.getFindedBooks.subscribe((data: Book[]) => {

      if (data.length === 1 && data[0].bookTitle === 'initialResult') {
        return false;
      } else {
        this.books = data;

      }

    });

    if (!this.books) {
      this.bookService.initialBooks().subscribe((data: Book[]) => {

        this.bookService.result = data;
        this.books = data;

        this.toastr.success(`The most popular books are displayed for you! &#x1F603;`, `Welcome to  Esverito Library`, {
          enableHtml: true,
          closeButton: true,
          progressBar: true,
          extendedTimeOut: 4500
        });

      });
    }


  }

}
