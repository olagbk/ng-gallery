import {
  Component, Input, OnInit, ElementRef, Renderer2, ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { GalleryState, GalleryDescConfig } from '../../models';

@Component({
  selector: 'gallery-text',
  template: `
    <div class="g-text-container" [ngStyle]="config.style">
      <div *ngIf="config.text" class="g-text" [innerHtml]="state.items[state.currIndex]?.text">
      </div>
      <div *ngIf="config.counter" class="g-number">
        {{(state.currIndex + 1) + '/' + state.items.length}}
      </div>
    </div>
  `,
  styles: [`
    gallery-text{position:relative;left:0;right:0;z-index:1}.g-text-container{padding:1em 2em;color:#ccc;font-size:13px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-line-pack:center;align-content:center;background-clip:padding-box;-webkit-font-smoothing:antialiased}.g-text{-webkit-box-flex:1;-ms-flex:1;flex:1}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryTextComponent implements OnInit {

  @Input() state: GalleryState;
  @Input() config: GalleryDescConfig;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    const el = this.el.nativeElement;
    /** text overlay */
    if (this.config.overlay) {
      this.renderer.setStyle(el, 'position', 'absolute');
    }

    /** text position */
    if (this.config.position === 'top') {
      this.renderer.setStyle(el, 'order', 0);
      this.renderer.setStyle(el, '-webkit-order', 0);
      this.renderer.setStyle(el, 'top', 0);
      this.renderer.setStyle(el, 'bottom', 'unset');
    } else {
      this.renderer.setStyle(el, 'order', 2);
      this.renderer.setStyle(el, '-webkit-order', 2);
      this.renderer.setStyle(el, 'top', 'unset');
      this.renderer.setStyle(el, 'bottom', 0);
    }
  }
}
