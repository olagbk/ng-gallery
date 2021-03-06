import { ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { Gallery } from '../services/gallery.service';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
export declare class GallerizeDirective implements OnInit, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    gallery: Gallery;
    /** gallerize images with specific classes */
    gallerize: string;
    observer: MutationObserver;
    constructor(el: ElementRef, renderer: Renderer2, gallery: Gallery);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
