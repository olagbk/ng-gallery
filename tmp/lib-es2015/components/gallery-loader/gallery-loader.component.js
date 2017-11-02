import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
export class GalleryLoaderComponent {
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
        this.icon = this.getIcon();
    }
    /**
     * @return {?}
     */
    getIcon() {
        switch (this.config.icon) {
            case 'puff':
                return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/puff.svg';
            case 'spinning-circles':
                return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/ball-triangle.svg';
            case 'three-dots':
                return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/three-dots.svg';
            case 'oval':
                return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/oval.svg';
            case 'ball-triangle':
                return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/ball-triangle.svg';
            case 'bars':
                return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/bars.svg';
            case 'tail-spin':
                return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/tail-spin.svg';
            default:
                /** Custom loading icon src */
                return this.config.icon;
        }
    }
}
GalleryLoaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-loader',
                template: `
    <div class="g-loader">
      <img [src]="icon" [style.width]="config.width" [style.height]="config.height"/>
    </div>
  `,
                styles: [`
    gallery-loader{z-index:1}.g-loader{z-index:1;position:absolute;width:100%;height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:1em}
  `],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
];
/**
 * @nocollapse
 */
GalleryLoaderComponent.ctorParameters = () => [
    { type: Gallery, },
];
GalleryLoaderComponent.propDecorators = {
    'config': [{ type: Input },],
};
function GalleryLoaderComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    GalleryLoaderComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    GalleryLoaderComponent.ctorParameters;
    /** @type {?} */
    GalleryLoaderComponent.propDecorators;
    /** @type {?} */
    GalleryLoaderComponent.prototype.config;
    /**
     * Loader icon
     * @type {?}
     */
    GalleryLoaderComponent.prototype.icon;
    /** @type {?} */
    GalleryLoaderComponent.prototype.gallery;
}
//# sourceMappingURL=gallery-loader.component.js.map