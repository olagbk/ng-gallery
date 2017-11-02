import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
export class GallerySliderComponent {
    /**
     * @param {?} gallery
     * @param {?} el
     * @param {?} renderer
     */
    constructor(gallery, el, renderer) {
        this.gallery = gallery;
        this.el = el;
        this.renderer = renderer;
        this.panning = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** Enable gestures */
        if (this.config.gestures) {
            if (typeof Hammer === 'undefined') {
                throw Error('[NgGallery]: HammerJS is undefined, make sure it is loaded');
            }
            else {
                const /** @type {?} */ mc = new Hammer(this.el.nativeElement);
                mc.on('panstart', () => {
                    this.renderer.removeClass(this.el.nativeElement, 'g-pan-reset');
                    this.panning = true;
                });
                mc.on('panend', () => {
                    this.renderer.addClass(this.el.nativeElement, 'g-pan-reset');
                    this.panning = false;
                });
                mc.on('pan', (e) => {
                    this.renderer.setStyle(this.el.nativeElement, 'transform', `translate3d(${e.deltaX}px, 0px, 0px)`);
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
}
GallerySliderComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-slider',
                template: `
    <gallery-items [state]="state" [config]="config"></gallery-items>
    <gallery-nav *ngIf="config.navigation && !panning" [state]="state"></gallery-nav>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
GallerySliderComponent.ctorParameters = () => [
    { type: Gallery, },
    { type: ElementRef, },
    { type: Renderer2, },
];
GallerySliderComponent.propDecorators = {
    'state': [{ type: Input },],
    'config': [{ type: Input },],
};
function GallerySliderComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    GallerySliderComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    GallerySliderComponent.ctorParameters;
    /** @type {?} */
    GallerySliderComponent.propDecorators;
    /** @type {?} */
    GallerySliderComponent.prototype.panning;
    /** @type {?} */
    GallerySliderComponent.prototype.state;
    /** @type {?} */
    GallerySliderComponent.prototype.config;
    /** @type {?} */
    GallerySliderComponent.prototype.gallery;
    /** @type {?} */
    GallerySliderComponent.prototype.el;
    /** @type {?} */
    GallerySliderComponent.prototype.renderer;
}
//# sourceMappingURL=gallery-slider.component.js.map