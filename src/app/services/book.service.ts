import {Injectable} from '@angular/core';
import {Book} from '../models/book';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {ToastrService} from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class BookService {


  result: Book[];

  private booksSourse = new BehaviorSubject<Book[]>([{
    isbn: 'initialResult',
    bookTitle: 'initialResult',
    author: 'initialResult',
    yearOfPublic: 'initialResult',
    publisher: 'initialResult',
    imageUrl: 'initialResult'
  }]);
  getFindedBooks = this.booksSourse.asObservable();

  private randomBookSource = new BehaviorSubject<Book[]>([]);
  getRandomBooks = this.randomBookSource.asObservable();


  constructor(
    public http: HttpClient,
    private toastr: ToastrService
  ) {
  }

  getBooks() {
    return this.http.get(`${environment.backendURL.url}/books`);
  }

  getBookById(id: string) {
    return this.http.get(`${environment.backendURL.url}/books/isbn/${id}`);
  }

  searchBooks(str: string) {
    this.http.get(`${environment.backendURL.url}/books/${str}`).subscribe((data: Book[]) => {

      this.result = data;

      this.booksSourse.next(data);
      if (data.length) {
        this.toastr.success(`${data.length} books have been found!`, `Search Success `, {
          enableHtml: true,
          closeButton: true,
          progressBar: true,
          extendedTimeOut: 2500
        });
      } else {
        this.toastr.error(`Nothing was found for your request. Please, try something else.`, `Oops...`, {
          enableHtml: true,
          closeButton: true,
          progressBar: true,
          extendedTimeOut: 2500
        });
      }

    });
  }


  initialBooks() {
    if (!this.result) {
      return this.http.get(`${environment.backendURL.url}/books/random`);
    } else {
      return of(this.result);
    }
  }
}


