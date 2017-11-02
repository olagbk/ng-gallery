import { Directive, ElementRef, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
export class LazyDirective {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        /**
         * Lazy load worker
         */
        this.lazyWorker$ = new Subject();
        this.loading = new EventEmitter();
        this.lazyWorker$.switchMap((imageSrc) => Observable.of(imageSrc)
            .do((src) => {
            /** Image is loading */
            this.loading.emit(true);
            const img = this.renderer.createElement('img');
            img.src = src;
            /** Image is loaded */
            img.onload = () => {
                this.renderer.setProperty(this.el.nativeElement, 'src', src);
                this.loading.emit(false);
            };
            /** Image load error */
            img.onerror = err => {
                this.loading.emit(false);
            };
        })).subscribe();
    }
    /**
     * @param {?} imagePath
     * @return {?}
     */
    set lazyImage(imagePath) {
        this.getImage(imagePath);
    }
    /**
     * @param {?} imagePath
     * @return {?}
     */
    getImage(imagePath) {
        this.lazyWorker$.next(imagePath);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.lazyWorker$.unsubscribe();
    }
}
LazyDirective.decorators = [
    { type: Directive, args: [{
                selector: '[lazyImage]'
            },] },
];
/**
 * @nocollapse
 */
LazyDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
];
LazyDirective.propDecorators = {
    'lazyImage': [{ type: Input, args: ['lazyImage',] },],
    'loading': [{ type: Output },],
};
function LazyDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    LazyDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    LazyDirective.ctorParameters;
    /** @type {?} */
    LazyDirective.propDecorators;
    /**
     * Lazy load worker
     * @type {?}
     */
    LazyDirective.prototype.lazyWorker$;
    /** @type {?} */
    LazyDirective.prototype.loading;
    /** @type {?} */
    LazyDirective.prototype.el;
    /** @type {?} */
    LazyDirective.prototype.renderer;
}
//# sourceMappingURL=lazy.directive.js.map