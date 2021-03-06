import { ElementRef, EventEmitter, Renderer2, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
export declare class LazyDirective implements OnDestroy {
    private el;
    private renderer;
    /** Lazy load worker */
    lazyWorker$: Subject<{}>;
    lazyImage: any;
    loading: EventEmitter<boolean>;
    constructor(el: ElementRef, renderer: Renderer2);
    getImage(imagePath: any): void;
    ngOnDestroy(): void;
}
