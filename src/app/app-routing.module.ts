import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { BookListComponent } from "./components/book-list/book-list.component";
import { BookListItemComponent} from "./components/book-list-item/book-list-item.component";

const routes: Routes = [
  {path: '', component: BookListComponent},
  {path: 'books/:id', component: BookListItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
