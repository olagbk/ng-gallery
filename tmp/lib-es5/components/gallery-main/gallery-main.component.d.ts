import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryConfig } from '../../models';
export declare class GalleryMainComponent {
    gallery: Gallery;
    state: GalleryState;
    config: GalleryConfig;
    isOverlay: boolean;
    constructor(gallery: Gallery);
}
