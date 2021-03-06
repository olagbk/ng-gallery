import { ModuleWithProviders } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { Gallery } from './services/gallery.service';
import { GalleryConfig } from './models';
/** Initialize Gallery with custom config
 * @param {GalleryConfig} config
 * @param {Overlay} overlay Required for the gallery dialog
 * @param {ViewportRuler} viewportRuler Required for the gallery dialog
 **/
export declare function galleryFactory(config: GalleryConfig, overlay: Overlay, viewportRuler: ViewportRuler): Gallery;
export declare class GalleryModule {
    static forRoot(config?: GalleryConfig): ModuleWithProviders;
}
