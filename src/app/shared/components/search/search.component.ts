import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  @Output()
  OnSearch = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  search(val: number | string): void {
    this.OnSearch.emit({ term: val });
  }

}
