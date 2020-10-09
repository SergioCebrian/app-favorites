import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appImageFallback]'
})
export class ImageFallbackDirective {

  private loadImage: boolean = false;

  constructor(private el: ElementRef) { }

  @HostListener('error') onError() {
    if (!this.loadImage) {
      this.el.nativeElement.src = 'assets/images/no-image.jpg';
    }

    this.loadImage = true;
  } 

}
