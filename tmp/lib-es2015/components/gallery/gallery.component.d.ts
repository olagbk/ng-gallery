import { OnDestroy } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
export declare class GalleryComponent implements OnDestroy {
    gallery: Gallery;
    isOverlay: boolean;
    constructor(gallery: Gallery);
    ngOnDestroy(): void;
}
