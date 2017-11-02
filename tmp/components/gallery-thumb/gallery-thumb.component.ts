import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryThumbConfig } from '../../models';

declare const Hammer: any;

@Component({
  selector: 'gallery-thumb',
  template: `
    <div class="g-thumb-container"
         [style.height.px]="config.height"
         [style.margin.px]="config.space">

      <div class="g-thumbs" [style.transform]="translateThumbs()">

        <div class="g-thumb" *ngFor="let image of state.items; let i = index"
             [class.g-thumb-current]="i === state.currIndex"
             [style.width.px]="gallery.config.thumbnails.width"
             [style.height.px]="gallery.config.thumbnails.height">

          <div class="g-thumb-image"
               [style.backgroundImage]="getThumbImage(i)"
               (tapClick)="gallery.set(i)">
          </div>
        </div>

      </div>

    </div>
  `,
  styles: [`
    gallery-thumb{display:block;z-index:1}.g-thumb-container{position:relative;z-index:2;width:100%;height:100%;left:0}.g-thumb-container,.g-thumbs{top:0;display:-webkit-box;display:-ms-flexbox;display:flex}.g-thumbs{position:absolute;left:50%;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-transition:-webkit-transform .3s ease-in;transition:-webkit-transform .3s ease-in;transition:transform .3s ease-in;transition:transform .3s ease-in,-webkit-transform .3s ease-in;-webkit-transform:translateZ(0);transform:translateZ(0)}.g-thumb{padding:8px;opacity:.5;-webkit-transition:all .2s linear;transition:all .2s linear}.g-thumb-image{cursor:pointer;width:100%;height:100%;background-position:50%;background-size:cover;-webkit-box-shadow:0 0 4px rgba(0,0,0,.3);box-shadow:0 0 4px rgba(0,0,0,.3)}.g-thumb-current{opacity:1;padding:2px}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryThumbComponent implements OnInit {

  @Input() state: GalleryState;
  @Input() config: GalleryThumbConfig;

  constructor(public gallery: Gallery, private el: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {

    /** Set thumbnails position (top or bottom) */
    const order = this.config.position === 'top' ? 0 : 2;
    this.renderer.setStyle(this.el.nativeElement, 'order', order);
    this.renderer.setStyle(this.el.nativeElement, '-webkit-order', order);

    /** Enable gestures */
    if (this.gallery.config.gestures) {
      if (typeof Hammer === 'undefined') {

        throw Error('[NgGallery]: HammerJS is undefined, make sure it is loaded');
      } else {
        const el = this.el.nativeElement;
        const mc = new Hammer(el);

        mc.on('panstart', () => {
          this.renderer.removeClass(el, 'g-pan-reset');
        });
        mc.on('panend', () => {
          this.renderer.addClass(el, 'g-pan-reset');
        });

        /** Pan left and right */
        mc.on('pan', (e) => {
          this.renderer.setStyle(el, 'transform', `translate3d(${e.deltaX}px, 0px, 0px)`);
        });
        /** Swipe next and prev */
        mc.on('swipeleft', () => {
          this.gallery.next();
        });
        mc.on('swiperight', () => {
          this.gallery.prev();
        });
      }
    }

  }

  /** Centralize active thumbnail */
  translateThumbs() {
    const x = this.state.currIndex * this.config.width + this.config.width / 2;
    return `translate3d(${-x}px, 0, 0)`;
  }

  getThumbImage(i) {
    /** Use thumbnail if presented */
    return `url(${this.state.items[i].thumbnail || this.state.items[i].src})`;
  }

}
