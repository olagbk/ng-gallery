import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { applyCssPrefixes } from '../../utils/auto-prefixer';
var GalleryBulletsComponent = (function () {
    /**
     * @param {?} gallery
     */
    function GalleryBulletsComponent(gallery) {
        this.gallery = gallery;
    }
    /**
     * @return {?}
     */
    GalleryBulletsComponent.prototype.ngOnInit = function () {
        var /** @type {?} */ style;
        switch (this.config.position) {
            case 'bottom':
                style = {
                    'flex-direction': 'row',
                    height: 'auto',
                    width: '100%',
                    bottom: 0
                };
                break;
            case 'left':
                style = {
                    'flex-direction': 'column',
                    height: '100%',
                    width: 'auto'
                };
                break;
            case 'right':
                style = {
                    'flex-direction': 'column',
                    height: '100%',
                    width: 'auto',
                    right: 0
                };
                break;
            default:
                // top
                style = {
                    'flex-direction': 'row',
                    height: 'auto',
                    width: '100%',
                };
                break;
        }
        this.containerStyle = applyCssPrefixes(style);
    };
    return GalleryBulletsComponent;
}());
export { GalleryBulletsComponent };
GalleryBulletsComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-bullets',
                template: "\n    <div class=\"g-bullets-container\" [ngStyle]=\"containerStyle\">\n      <div class=\"g-bullet\"\n           *ngFor=\"let item of state.items; let i = index\"\n           [class.g-bullet-curr]=\"i === state.currIndex\"\n           (tapClick)=\"gallery.set(i)\">\n\n        <div class=\"g-bullet-inner\" [ngStyle]=\"config.style\"></div>\n\n      </div>\n    </div>\n  ",
                styles: ["\n    .g-bullets-container{position:absolute;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.g-bullet,.g-bullets-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.g-bullet{cursor:pointer;z-index:1}.g-bullet-inner{margin:1em;height:4px;width:4px;background-color:hsla(0,0%,100%,.5);border-radius:2px;-webkit-box-shadow:0 0 6px rgba(0,0,0,.8);box-shadow:0 0 6px rgba(0,0,0,.8);-webkit-transition:all .2s ease;transition:all .2s ease}.g-bullet-curr .g-bullet-inner{-webkit-transform:scale(1.5);transform:scale(1.5);background-color:#fff}\n  "],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
];
/**
 * @nocollapse
 */
GalleryBulletsComponent.ctorParameters = function () { return [
    { type: Gallery, },
]; };
GalleryBulletsComponent.propDecorators = {
    'state': [{ type: Input },],
    'config': [{ type: Input },],
};
function GalleryBulletsComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    GalleryBulletsComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    GalleryBulletsComponent.ctorParameters;
    /** @type {?} */
    GalleryBulletsComponent.propDecorators;
    /** @type {?} */
    GalleryBulletsComponent.prototype.containerStyle;
    /** @type {?} */
    GalleryBulletsComponent.prototype.state;
    /** @type {?} */
    GalleryBulletsComponent.prototype.config;
    /** @type {?} */
    GalleryBulletsComponent.prototype.gallery;
}
//# sourceMappingURL=gallery-bullets.component.js.map