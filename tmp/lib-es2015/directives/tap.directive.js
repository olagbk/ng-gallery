/** This directive enable tap if HammerJS is loaded, otherwise it falls back to normal click event */
import { Directive, ElementRef, EventEmitter, Output, Renderer2 } from '@angular/core';
import { Gallery } from '../services/gallery.service';
export class TapDirective {
    /**
     * @param {?} gallery
     * @param {?} el
     * @param {?} renderer
     */
    constructor(gallery, el, renderer) {
        this.gallery = gallery;
        this.el = el;
        this.renderer = renderer;
        this.tapClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setTapEvent();
    }
    /**
     * Enable gestures if hammer is loaded
     * @return {?}
     */
    setTapEvent() {
        if (this.gallery.config.gestures) {
            if (typeof Hammer === 'undefined') {
                throw Error('[NgGallery]: HammerJS is undefined, make sure it is loaded');
            }
            else {
                /** Use tap for click event */
                if (typeof Hammer !== 'undefined') {
                    const /** @type {?} */ mc = new Hammer(this.el.nativeElement);
                    mc.on('tap', () => {
                        this.tapClick.emit(null);
                    });
                }
            }
        }
        else {
            /** Use normal click event */
            this.renderer.setProperty(this.el.nativeElement, 'onclick', () => {
                this.tapClick.emit(null);
            });
        }
    }
}
TapDirective.decorators = [
    { type: Directive, args: [{
                selector: '[tapClick]'
            },] },
];
/**
 * @nocollapse
 */
TapDirective.ctorParameters = () => [
    { type: Gallery, },
    { type: ElementRef, },
    { type: Renderer2, },
];
TapDirective.propDecorators = {
    'tapClick': [{ type: Output },],
};
function TapDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    TapDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    TapDirective.ctorParameters;
    /** @type {?} */
    TapDirective.propDecorators;
    /** @type {?} */
    TapDirective.prototype.tapClick;
    /** @type {?} */
    TapDirective.prototype.gallery;
    /** @type {?} */
    TapDirective.prototype.el;
    /** @type {?} */
    TapDirective.prototype.renderer;
}
//# sourceMappingURL=tap.directive.js.map