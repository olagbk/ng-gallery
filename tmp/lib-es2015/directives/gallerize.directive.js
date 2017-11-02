import { Directive, ElementRef, Renderer2, Input } from '@angular/core';
import { Gallery } from '../services/gallery.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
export class GallerizeDirective {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} gallery
     */
    constructor(el, renderer, gallery) {
        this.el = el;
        this.renderer = renderer;
        this.gallery = gallery;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** Observe content changes */
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const /** @type {?} */ images = [];
                /**
                 * Serialize img classes
                 */
                const classes = (this.gallerize) ? this.gallerize.split(' ').map((className) => '.' + className) : '';
                /**
                 * get all img elements from content
                 */
                const imageElements = this.el.nativeElement.querySelectorAll('img' + classes);
                if (imageElements) {
                    Observable.from(imageElements)
                        .map((img, i) => {
                        /** Add click event to the image */
                        this.renderer.setStyle(img, 'cursor', 'pointer');
                        this.renderer.setProperty(img, 'onclick', () => this.gallery.open(i));
                        /** Create image item for the gallery */
                        images.push({
                            src: img.src,
                            text: img.alt
                        });
                    })
                        .finally(() => this.gallery.load(images))
                        .subscribe();
                }
            });
        });
        const /** @type {?} */ config = {
            attributes: true,
            childList: true,
            characterData: true
        };
        this.observer.observe(this.el.nativeElement, config);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.observer.disconnect();
    }
}
GallerizeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[gallerize]'
            },] },
];
/**
 * @nocollapse
 */
GallerizeDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: Gallery, },
];
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