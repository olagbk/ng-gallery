import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
export class GalleryItemsComponent {
    /**
     * @param {?} gallery
     */
    constructor(gallery) {
        this.gallery = gallery;
        this.loading = false;
    }
    /**
     * @param {?} simpleChanges
     * @return {?}
     */
    ngOnChanges(simpleChanges) {
        /** Show loading when current image changes */
        if (!simpleChanges['state'].firstChange) {
            const /** @type {?} */ curr = simpleChanges['state'].currentValue;
            const /** @type {?} */ prev = simpleChanges['state'].previousValue;
            if (curr.currIndex !== prev.currIndex) {
                this.loading = true;
            }
        }
    }
}
GalleryItemsComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-items',
                template: `
    <div *ngIf="state.items[state.currIndex]; let curr"
         class="g-item"
         [class.g-lazyloaded]="!loading">

      <img [lazyImage]="curr.src"
           [alt]="curr.text"
           (loading)="loading = $event">

    </div>

    <gallery-loader *ngIf="loading" [config]="config.loader"></gallery-loader>
  `,
                styles: [`
    gallery-items{z-index:1;-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;-webkit-box-flex:1;-ms-flex:1;flex:1;flex-direction:column;-webkit-transform:translateZ(0);transform:translateZ(0)}.g-item,gallery-items{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column}.g-item{position:absolute;left:0;right:0;top:0;bottom:0;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;opacity:0}.g-item.g-lazyloaded{opacity:1;-webkit-transition:opacity .3s ease-in;transition:opacity .3s ease-in}.g-item img{-webkit-box-shadow:0 0 4px rgba(0,0,0,.3);box-shadow:0 0 4px rgba(0,0,0,.3);pointer-events:none;display:block;max-width:100%;max-height:100%}
  `],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
];
/**
 * @nocollapse
 */
GalleryItemsComponent.ctorParameters = () => [
    { type: Gallery, },
];
GalleryItemsComponent.propDecorators = {
    'state': [{ type: Input },],
    'config': [{ type: Input },],
};
function GalleryItemsComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    GalleryItemsComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    GalleryItemsComponent.ctorParameters;
    /** @type {?} */
    GalleryItemsComponent.propDecorators;
    /** @type {?} */
    GalleryItemsComponent.prototype.loading;
    /** @type {?} */
    GalleryItemsComponent.prototype.state;
    /** @type {?} */
    GalleryItemsComponent.prototype.config;
    /** @type {?} */
    GalleryItemsComponent.prototype.gallery;
}
//# sourceMappingURL=gallery-items.component.js.map