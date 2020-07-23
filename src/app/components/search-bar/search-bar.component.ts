import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';



@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchValue: string;
  searchProperty = 'all';

  ngOnInit() {
  }

  constructor(
    private bookService: BookService,
  ) {
  }

  searchBooks() {
    switch (this.searchProperty) {
      case 'all':
        this.bookService.searchBooks(`search/${this.searchValue}`);
        break;
      case 'author':
        this.bookService.searchBooks(`title/${this.searchValue}`);
        break;
      case 'title':
        this.bookService.searchBooks(`author/${this.searchValue}`);
        break;
      case 'publisher':
        this.bookService.searchBooks(`publisher/${this.searchValue}`);
        break;
    }

  }
}
