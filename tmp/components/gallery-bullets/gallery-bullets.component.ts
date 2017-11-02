import { Component, Input, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryBulletConfig } from '../../models';
import { applyCssPrefixes } from '../../utils/auto-prefixer';

@Component({
  selector: 'gallery-bullets',
  template: `
    <div class="g-bullets-container" [ngStyle]="containerStyle">
      <div class="g-bullet"
           *ngFor="let item of state.items; let i = index"
           [class.g-bullet-curr]="i === state.currIndex"
           (tapClick)="gallery.set(i)">

        <div class="g-bullet-inner" [ngStyle]="config.style"></div>

      </div>
    </div>
  `,
  styles: [`
    .g-bullets-container{position:absolute;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.g-bullet,.g-bullets-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.g-bullet{cursor:pointer;z-index:1}.g-bullet-inner{margin:1em;height:4px;width:4px;background-color:hsla(0,0%,100%,.5);border-radius:2px;-webkit-box-shadow:0 0 6px rgba(0,0,0,.8);box-shadow:0 0 6px rgba(0,0,0,.8);-webkit-transition:all .2s ease;transition:all .2s ease}.g-bullet-curr .g-bullet-inner{-webkit-transform:scale(1.5);transform:scale(1.5);background-color:#fff}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryBulletsComponent implements OnInit {

  containerStyle;
  @Input() state: GalleryState;
  @Input() config: GalleryBulletConfig;

  constructor(public gallery: Gallery) {
  }

  ngOnInit() {

    let style;

    switch (this.config.position) {
      case 'bottom':
        style = {
          'flex-direction': 'row',
          height: 'auto',
          width: '100%',
          bottom: 0
        };
        break;
      case 'left':
        style = {
          'flex-direction': 'column',
          height: '100%',
          width: 'auto'
        };
        break;
      case 'right':
        style = {
          'flex-direction': 'column',
          height: '100%',
          width: 'auto',
          right: 0
        };
        break;
      default:
        // top
        style = {
          'flex-direction': 'row',
          height: 'auto',
          width: '100%',
        };
        break;
    }

    this.containerStyle = applyCssPrefixes(style);
  }


}
