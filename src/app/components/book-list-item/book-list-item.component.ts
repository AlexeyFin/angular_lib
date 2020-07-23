import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent implements OnInit {

  bookId: string;
  books: Book[] = [];
  book: Book;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private bookService: BookService
  ) {
  }

  ngOnInit() {
    this.bookId = this.activatedRoute.snapshot.params['id'];
    this.bookService.getBookById(this.bookId).subscribe((data: Book) => {
      this.book = data;
      this.books.push(data);
    });
  }

  public captureScreen() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data, {
      
      useCORS: true
    }).then(canvas => {
      // Few necessary setting options
      let imgWidth = 208;
      let pageHeight = 395;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(`${this.book.bookTitle}.pdf`); // Generated PDF
    });


  }

}
