import {  ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryConfig } from '../../models';

@Component({
  selector: 'gallery-main',
  template: `
    <div class="g-container" *ngIf="state.items?.length; else empty" [ngStyle]="config.style">

      <gallery-thumb *ngIf="config.thumbnails" [state]="state" [config]="config.thumbnails"></gallery-thumb>

      <div class="g-box">

        <gallery-slider [state]="state" [config]="config"></gallery-slider>

        <gallery-bullets *ngIf="config.bullets" [state]="state" [config]="config.bullets"></gallery-bullets>

      </div>

      <gallery-player *ngIf="config.player" [config]="config.player"></gallery-player>

      <gallery-text *ngIf="config.description" [state]="state" [config]="config.description"></gallery-text>

      <div *ngIf="isOverlay" class="g-btn-close" (tapClick)="gallery.close()"></div>

    </div>

    <ng-template #empty>
      <div class="empty">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  styles: [`
    gallery-main{-webkit-box-flex:1;-ms-flex:1;flex:1;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.g-container,gallery-main{position:relative;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column}.g-container{overflow:hidden;height:100%;max-height:100%;max-width:100%;flex-direction:column}@media (max-width:480px){.g-container{width:100%!important;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;-ms-flex-direction:column!important;flex-direction:column!important}}.g-box{height:100%}.g-box,gallery-slider{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;height:100%}.g-pan-reset{-webkit-transition:all .3s linear;transition:all .3s linear;-webkit-transform:translateZ(0)!important;transform:translateZ(0)!important}.g-swipe-invis .g-item img{opacity:0}gallery-items .g-pan-reset{-webkit-transition:none;transition:none}.g-btn-close{position:absolute;right:.73em;top:.73em;z-index:1;cursor:pointer;width:30px;height:30px;-webkit-transition:all .2s linear;transition:all .2s linear;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUwIDUwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MCA1MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxjaXJjbGUgc3R5bGU9ImZpbGw6I0Q3NUE0QTsiIGN4PSIyNSIgY3k9IjI1IiByPSIyNSIvPjxwb2x5bGluZSBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgcG9pbnRzPSIxNiwzNCAyNSwyNSAzNCwxNiAiLz48cG9seWxpbmUgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6I0ZGRkZGRjtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiIHBvaW50cz0iMTYsMTYgMjUsMjUgMzQsMzQgIi8+PC9zdmc+)}.g-btn-close:active{-webkit-transform:rotate(180deg) scale(.9);transform:rotate(180deg) scale(.9)}.empty{color:#fff;background-color:#121519;position:absolute;width:100%;height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryMainComponent {

  @Input() state: GalleryState;
  @Input() config: GalleryConfig;
  @Input() isOverlay: boolean;

  constructor(public gallery: Gallery) {
  }

}
