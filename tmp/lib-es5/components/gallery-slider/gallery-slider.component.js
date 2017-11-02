import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
var GallerySliderComponent = (function () {
    /**
     * @param {?} gallery
     * @param {?} el
     * @param {?} renderer
     */
    function GallerySliderComponent(gallery, el, renderer) {
        this.gallery = gallery;
        this.el = el;
        this.renderer = renderer;
        this.panning = false;
    }
    /**
     * @return {?}
     */
    GallerySliderComponent.prototype.ngOnInit = function () {
        var _this = this;
        /** Enable gestures */
        if (this.config.gestures) {
            if (typeof Hammer === 'undefined') {
                throw Error('[NgGallery]: HammerJS is undefined, make sure it is loaded');
            }
            else {
                var /** @type {?} */ mc = new Hammer(this.el.nativeElement);
                mc.on('panstart', function () {
                    _this.renderer.removeClass(_this.el.nativeElement, 'g-pan-reset');
                    _this.panning = true;
                });
                mc.on('panend', function () {
                    _this.renderer.addClass(_this.el.nativeElement, 'g-pan-reset');
                    _this.panning = false;
                });
                mc.on('pan', function (e) {
                    _this.renderer.setStyle(_this.el.nativeElement, 'transform', "translate3d(" + e.deltaX + "px, 0px, 0px)");
                });
                /** Swipe next and prev */
                mc.on('swipeleft', function () {
                    _this.gallery.next();
                });
                mc.on('swiperight', function () {
                    _this.gallery.prev();
                });
            }
        }
    };
    return GallerySliderComponent;
}());
export { GallerySliderComponent };
GallerySliderComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-slider',
                template: "\n    <gallery-items [state]=\"state\" [config]=\"config\"></gallery-items>\n    <gallery-nav *ngIf=\"config.navigation && !panning\" [state]=\"state\"></gallery-nav>\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
GallerySliderComponent.ctorParameters = function () { return [
    { type: Gallery, },
    { type: ElementRef, },
    { type: Renderer2, },
]; };
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