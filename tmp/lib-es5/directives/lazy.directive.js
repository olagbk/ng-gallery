import { Directive, ElementRef, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
var LazyDirective = (function () {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    function LazyDirective(el, renderer) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        /**
         * Lazy load worker
         */
        this.lazyWorker$ = new Subject();
        this.loading = new EventEmitter();
        this.lazyWorker$.switchMap(function (imageSrc) {
            return Observable.of(imageSrc)
                .do(function (src) {
                /** Image is loading */
                _this.loading.emit(true);
                var img = _this.renderer.createElement('img');
                img.src = src;
                /** Image is loaded */
                img.onload = function () {
                    _this.renderer.setProperty(_this.el.nativeElement, 'src', src);
                    _this.loading.emit(false);
                };
                /** Image load error */
                img.onerror = function (err) {
                    _this.loading.emit(false);
                };
            });
        }).subscribe();
    }
    Object.defineProperty(LazyDirective.prototype, "lazyImage", {
        /**
         * @param {?} imagePath
         * @return {?}
         */
        set: function (imagePath) {
            this.getImage(imagePath);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} imagePath
     * @return {?}
     */
    LazyDirective.prototype.getImage = function (imagePath) {
        this.lazyWorker$.next(imagePath);
    };
    /**
     * @return {?}
     */
    LazyDirective.prototype.ngOnDestroy = function () {
        this.lazyWorker$.unsubscribe();
    };
    return LazyDirective;
}());
export { LazyDirective };
LazyDirective.decorators = [
    { type: Directive, args: [{
                selector: '[lazyImage]'
            },] },
];
/**
 * @nocollapse
 */
LazyDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
]; };
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