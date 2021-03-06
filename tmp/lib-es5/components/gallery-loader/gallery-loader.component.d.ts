import { OnInit } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryLoaderConfig } from '../../models';
export declare class GalleryLoaderComponent implements OnInit {
    gallery: Gallery;
    config: GalleryLoaderConfig;
    /** Loader icon */
    icon: string;
    constructor(gallery: Gallery);
    ngOnInit(): void;
    getIcon(): string;
}
