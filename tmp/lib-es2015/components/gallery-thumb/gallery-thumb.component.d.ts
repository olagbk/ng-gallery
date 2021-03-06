import { ElementRef, Renderer2, OnInit } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryThumbConfig } from '../../models';
export declare class GalleryThumbComponent implements OnInit {
    gallery: Gallery;
    private el;
    private renderer;
    state: GalleryState;
    config: GalleryThumbConfig;
    constructor(gallery: Gallery, el: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    /** Centralize active thumbnail */
    translateThumbs(): string;
    getThumbImage(i: any): string;
}
