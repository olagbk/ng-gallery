import { SimpleChanges, OnChanges } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryConfig } from '../../models';
export declare class GalleryItemsComponent implements OnChanges {
    gallery: Gallery;
    loading: boolean;
    state: GalleryState;
    config: GalleryConfig;
    constructor(gallery: Gallery);
    ngOnChanges(simpleChanges: SimpleChanges): void;
}
