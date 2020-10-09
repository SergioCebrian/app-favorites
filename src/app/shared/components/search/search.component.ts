import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  @Output()
  notifySearchTerm = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  search(val: number | string): void {
    this.notifySearchTerm.emit({ term: val });
  }

}
