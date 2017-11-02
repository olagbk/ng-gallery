import {
  Component,
  ChangeDetectionStrategy,
  HostListener,
  EventEmitter,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'gallery-lightbox',
  template: `<gallery [@slideGalleryIn] [isOverlay]="true"></gallery>`,
  styles: [`
    .g-backdrop{background-color:rgba(0,0,0,.8)}.g-overlay{margin:auto}gallery-lightbox{position:relative;display:block}gallery-lightbox gallery{border-radius:1.32em;overflow:hidden;margin:0;display:block;width:100%;height:100%;-webkit-box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1}.cdk-global-overlay-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;z-index:1}.cdk-overlay-pane{-webkit-box-sizing:border-box;box-sizing:border-box}.cdk-overlay-backdrop,.cdk-overlay-pane{position:absolute;pointer-events:auto;z-index:1}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;-webkit-transition:opacity .4s cubic-bezier(.25,.8,.25,1);transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)}.cdk-overlay-transparent-backdrop{background:none}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}
  `],
  animations: [
    trigger('slideGalleryIn', [
      state('void', style({transform: 'translateY(25%) scale(0.9)', opacity: 0})),
      state('enter', style({transform: 'translateY(0%) scale(1)', opacity: 1})),
      state('exit', style({transform: 'translateY(25%)', opacity: 0})),
      transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryLightboxComponent {

  @Output() keyDown = new EventEmitter<KeyboardEvent>();

  @HostListener('document:keydown', ['$event'])
  onKeyDown(ev: KeyboardEvent) {
    this.keyDown.next(ev);
  }

}
