import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryConfig } from '../../models';
export declare class GallerySliderComponent implements OnInit {
    gallery: Gallery;
    private el;
    private renderer;
    panning: boolean;
    state: GalleryState;
    config: GalleryConfig;
    constructor(gallery: Gallery, el: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
}
