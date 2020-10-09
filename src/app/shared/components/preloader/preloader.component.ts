import { Component, OnInit } from '@angular/core';
import { PreloaderService } from '@services/preloader/preloader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
})
export class PreloaderComponent implements OnInit {

  isLoading: Subject<boolean> = this.preloaderService.isLoading;

  constructor(private preloaderService: PreloaderService) { }

  ngOnInit() {}

}
