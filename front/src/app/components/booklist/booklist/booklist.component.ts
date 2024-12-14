import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booklist',
  imports: [],
  templateUrl: './booklist.component.html',
  styleUrl: './booklist.component.scss'
})
export class BooklistComponent  implements OnInit {
  shelves = [
    [
      { title: 'Book Title 1', author: 'Author 1', image: 'https://via.placeholder.com/100x150' },
      { title: 'Book Title 2', author: 'Author 2', image: 'https://via.placeholder.com/100x150' },
      { title: 'Book Title 3', author: 'Author 3', image: 'https://via.placeholder.com/100x150' }
    ],
    [
      { title: 'Book Title 4', author: 'Author 4', image: 'https://via.placeholder.com/100x150' },
      { title: 'Book Title 5', author: 'Author 5', image: 'https://via.placeholder.com/100x150' },
      { title: 'Book Title 6', author: 'Author 6', image: 'https://via.placeholder.com/100x150' }
    ]
  ];
  rotation: string = "";
ngOnInit(): void {

}

}
