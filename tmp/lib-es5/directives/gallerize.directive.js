import { Directive, ElementRef, Renderer2, Input } from '@angular/core';
import { Gallery } from '../services/gallery.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
var GallerizeDirective = (function () {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} gallery
     */
    function GallerizeDirective(el, renderer, gallery) {
        this.el = el;
        this.renderer = renderer;
        this.gallery = gallery;
    }
    /**
     * @return {?}
     */
    GallerizeDirective.prototype.ngOnInit = function () {
        /** Observe content changes */
        var _this = this;
        this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var /** @type {?} */ images = [];
                /**
                 * Serialize img classes
                 */
                var classes = (_this.gallerize) ? _this.gallerize.split(' ').map(function (className) { return '.' + className; }) : '';
                /**
                 * get all img elements from content
                 */
                var imageElements = _this.el.nativeElement.querySelectorAll('img' + classes);
                if (imageElements) {
                    Observable.from(imageElements)
                        .map(function (img, i) {
                        /** Add click event to the image */
                        _this.renderer.setStyle(img, 'cursor', 'pointer');
                        _this.renderer.setProperty(img, 'onclick', function () { return _this.gallery.open(i); });
                        /** Create image item for the gallery */
                        images.push({
                            src: img.src,
                            text: img.alt
                        });
                    })
                        .finally(function () { return _this.gallery.load(images); })
                        .subscribe();
                }
            });
        });
        var /** @type {?} */ config = {
            attributes: true,
            childList: true,
            characterData: true
        };
        this.observer.observe(this.el.nativeElement, config);
    };
    /**
     * @return {?}
     */
    GallerizeDirective.prototype.ngOnDestroy = function () {
        this.observer.disconnect();
    };
    return GallerizeDirective;
}());
export { GallerizeDirective };
GallerizeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[gallerize]'
            },] },
];
/**
 * @nocollapse
 */
GallerizeDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: Gallery, },
]; };
GallerizeDirective.propDecorators = {
    'gallerize': [{ type: Input },],
};
function GallerizeDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    GallerizeDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    GallerizeDirective.ctorParameters;
    /** @type {?} */
    GallerizeDirective.propDecorators;
    /**
     * gallerize images with specific classes
     * @type {?}
     */
    GallerizeDirective.prototype.gallerize;
    /** @type {?} */
    GallerizeDirective.prototype.observer;
    /** @type {?} */
    GallerizeDirective.prototype.el;
    /** @type {?} */
    GallerizeDirective.prototype.renderer;
    /** @type {?} */
    GallerizeDirective.prototype.gallery;
}
//# sourceMappingURL=gallerize.directive.js.map