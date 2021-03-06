/** This directive enable tap if HammerJS is loaded, otherwise it falls back to normal click event */
import { ElementRef, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { Gallery } from '../services/gallery.service';
export declare class TapDirective implements OnInit {
    private gallery;
    private el;
    private renderer;
    tapClick: EventEmitter<{}>;
    constructor(gallery: Gallery, el: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    /** Enable gestures if hammer is loaded */
    setTapEvent(): void;
}
