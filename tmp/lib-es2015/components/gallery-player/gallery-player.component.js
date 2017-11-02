import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/timer';
export class GalleryPlayerComponent {
    /**
     * @param {?} gallery
     */
    constructor(gallery) {
        this.gallery = gallery;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** Start auto-play if enabled */
        if (this.config.autoplay) {
            this.gallery.play();
        }
        // this.progress$ = this.gallery.state$
        //   .map((state: GalleryState) => state.currIndex)
        //   .mergeMap(() => Observable.timer(0, 100).take(2).map(v => !!v));
    }
}
// getClasses(e) {
//   return {
//     'g-progress-initial': !e,
//     'g-progress-done': e
//   };
// }
GalleryPlayerComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-player',
                template: `
    <!--<div *ngIf="config.autoplay && config.progress" class="g-progress-bar">-->
      <!--<div class="g-progress"-->
           <!--[ngClass]="getClasses(progress$ | async)"-->
           <!--[style.transitionDuration]="config.interval + 'ms'">-->

      <!--</div>-->
    <!--</div>-->
  `,
                styles: [`
    gallery-player{position:absolute;z-index:2;left:0;right:0;overflow:unset}.g-progress-bar{position:absolute;top:0;width:100%}.g-progress{width:100%;height:3px;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);z-index:1}.g-progress-initial{-webkit-transition-duration:0ms!important;transition-duration:0ms!important}.g-progress-done{-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-transition-timing-function:linear;transition-timing-function:linear;background-color:#bcc8ce;-webkit-transform:translateZ(0);transform:translateZ(0)}
  `],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
];
/**
 * @nocollapse
 */
GalleryPlayerComponent.ctorParameters = () => [
    { type: Gallery, },
];
GalleryPlayerComponent.propDecorators = {
    'config': [{ type: Input },],
};
function GalleryPlayerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    GalleryPlayerComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    GalleryPlayerComponent.ctorParameters;
    /** @type {?} */
    GalleryPlayerComponent.propDecorators;
    /** @type {?} */
    GalleryPlayerComponent.prototype.progress$;
    /** @type {?} */
    GalleryPlayerComponent.prototype.config;
    /** @type {?} */
    GalleryPlayerComponent.prototype.gallery;
}
//# sourceMappingURL=gallery-player.component.js.map