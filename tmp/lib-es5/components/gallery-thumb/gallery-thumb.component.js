import { Component, Input, ChangeDetectionStrategy, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
var GalleryThumbComponent = (function () {
    /**
     * @param {?} gallery
     * @param {?} el
     * @param {?} renderer
     */
    function GalleryThumbComponent(gallery, el, renderer) {
        this.gallery = gallery;
        this.el = el;
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    GalleryThumbComponent.prototype.ngOnInit = function () {
        var _this = this;
        /**
         * Set thumbnails position (top or bottom)
         */
        var order = this.config.position === 'top' ? 0 : 2;
        this.renderer.setStyle(this.el.nativeElement, 'order', order);
        this.renderer.setStyle(this.el.nativeElement, '-webkit-order', order);
        /** Enable gestures */
        if (this.gallery.config.gestures) {
            if (typeof Hammer === 'undefined') {
                throw Error('[NgGallery]: HammerJS is undefined, make sure it is loaded');
            }
            else {
                var /** @type {?} */ el_1 = this.el.nativeElement;
                var /** @type {?} */ mc = new Hammer(el_1);
                mc.on('panstart', function () {
                    _this.renderer.removeClass(el_1, 'g-pan-reset');
                });
                mc.on('panend', function () {
                    _this.renderer.addClass(el_1, 'g-pan-reset');
                });
                /** Pan left and right */
                mc.on('pan', function (e) {
                    _this.renderer.setStyle(el_1, 'transform', "translate3d(" + e.deltaX + "px, 0px, 0px)");
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
    /**
     * Centralize active thumbnail
     * @return {?}
     */
    GalleryThumbComponent.prototype.translateThumbs = function () {
        var /** @type {?} */ x = this.state.currIndex * this.config.width + this.config.width / 2;
        return "translate3d(" + -x + "px, 0, 0)";
    };
    /**
     * @param {?} i
     * @return {?}
     */
    GalleryThumbComponent.prototype.getThumbImage = function (i) {
        /** Use thumbnail if presented */
        return "url(" + (this.state.items[i].thumbnail || this.state.items[i].src) + ")";
    };
    return GalleryThumbComponent;
}());
export { GalleryThumbComponent };
GalleryThumbComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-thumb',
                template: "\n    <div class=\"g-thumb-container\"\n         [style.height.px]=\"config.height\"\n         [style.margin.px]=\"config.space\">\n\n      <div class=\"g-thumbs\" [style.transform]=\"translateThumbs()\">\n\n        <div class=\"g-thumb\" *ngFor=\"let image of state.items; let i = index\"\n             [class.g-thumb-current]=\"i === state.currIndex\"\n             [style.width.px]=\"gallery.config.thumbnails.width\"\n             [style.height.px]=\"gallery.config.thumbnails.height\">\n\n          <div class=\"g-thumb-image\"\n               [style.backgroundImage]=\"getThumbImage(i)\"\n               (tapClick)=\"gallery.set(i)\">\n          </div>\n        </div>\n\n      </div>\n\n    </div>\n  ",
                styles: ["\n    gallery-thumb{display:block;z-index:1}.g-thumb-container{position:relative;z-index:2;width:100%;height:100%;left:0}.g-thumb-container,.g-thumbs{top:0;display:-webkit-box;display:-ms-flexbox;display:flex}.g-thumbs{position:absolute;left:50%;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-transition:-webkit-transform .3s ease-in;transition:-webkit-transform .3s ease-in;transition:transform .3s ease-in;transition:transform .3s ease-in,-webkit-transform .3s ease-in;-webkit-transform:translateZ(0);transform:translateZ(0)}.g-thumb{padding:8px;opacity:.5;-webkit-transition:all .2s linear;transition:all .2s linear}.g-thumb-image{cursor:pointer;width:100%;height:100%;background-position:50%;background-size:cover;-webkit-box-shadow:0 0 4px rgba(0,0,0,.3);box-shadow:0 0 4px rgba(0,0,0,.3)}.g-thumb-current{opacity:1;padding:2px}\n  "],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
];
/**
 * @nocollapse
 */
GalleryThumbComponent.ctorParameters = function () { return [
    { type: Gallery, },
    { type: ElementRef, },
    { type: Renderer2, },
]; };
GalleryThumbComponent.propDecorators = {
    'state': [{ type: Input },],
    'config': [{ type: Input },],
};
function GalleryThumbComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    GalleryThumbComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    GalleryThumbComponent.ctorParameters;
    /** @type {?} */
    GalleryThumbComponent.propDecorators;
    /** @type {?} */
    GalleryThumbComponent.prototype.state;
    /** @type {?} */
    GalleryThumbComponent.prototype.config;
    /** @type {?} */
    GalleryThumbComponent.prototype.gallery;
    /** @type {?} */
    GalleryThumbComponent.prototype.el;
    /** @type {?} */
    GalleryThumbComponent.prototype.renderer;
}
//# sourceMappingURL=gallery-thumb.component.js.map