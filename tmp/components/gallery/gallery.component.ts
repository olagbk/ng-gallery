import { ChangeDetectionStrategy, Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';

@Component({
  selector: 'gallery',
  template: `<gallery-main [state]="gallery.state$ | async" [config]="gallery.config$ | async" [isOverlay]="isOverlay"></gallery-main>`,
  styles: [`
    gallery{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;margin-bottom:2em;z-index:1;overflow:hidden}gallery *{-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnDestroy {

  @Input() isOverlay: boolean;

  constructor(public gallery: Gallery) {
  }

  ngOnDestroy() {
    this.isOverlay ? this.gallery.close() : this.gallery.reset();
  }

}
