import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
var GalleryComponent = (function () {
    /**
     * @param {?} gallery
     */
    function GalleryComponent(gallery) {
        this.gallery = gallery;
    }
    /**
     * @return {?}
     */
    GalleryComponent.prototype.ngOnDestroy = function () {
        this.isOverlay ? this.gallery.close() : this.gallery.reset();
    };
    return GalleryComponent;
}());
export { GalleryComponent };
GalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery',
                template: "<gallery-main [state]=\"gallery.state$ | async\" [config]=\"gallery.config$ | async\" [isOverlay]=\"isOverlay\"></gallery-main>",
                styles: ["\n    gallery{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;margin-bottom:2em;z-index:1;overflow:hidden}gallery *{-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}\n  "],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
];
/**
 * @nocollapse
 */
GalleryComponent.ctorParameters = function () { return [
    { type: Gallery, },
]; };
GalleryComponent.propDecorators = {
    'isOverlay': [{ type: Input },],
};
function GalleryComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    GalleryComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    GalleryComponent.ctorParameters;
    /** @type {?} */
    GalleryComponent.propDecorators;
    /** @type {?} */
    GalleryComponent.prototype.isOverlay;
    /** @type {?} */
    GalleryComponent.prototype.gallery;
}
//# sourceMappingURL=gallery.component.js.map