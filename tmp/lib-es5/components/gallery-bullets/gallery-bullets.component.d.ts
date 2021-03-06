import { OnInit } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryBulletConfig } from '../../models';
export declare class GalleryBulletsComponent implements OnInit {
    gallery: Gallery;
    containerStyle: any;
    state: GalleryState;
    config: GalleryBulletConfig;
    constructor(gallery: Gallery);
    ngOnInit(): void;
}
