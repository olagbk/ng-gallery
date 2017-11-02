var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Inject, Injectable } from '@angular/core';
import { ENTER, ESCAPE, RIGHT_ARROW, LEFT_ARROW } from '@angular/cdk/keycodes';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { BlockScrollStrategy, GlobalPositionStrategy, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import { CONFIG } from './gallery.token';
import { GalleryLightboxComponent } from '../components/gallery-lightbox/gallery-lightbox.component';
import { defaultConfig } from './gallery.default';
import { mergeDeep } from '../utils/merge-deep';
var Gallery = (function () {
    /**
     * @param {?} config
     * @param {?} overlay
     * @param {?} viewportRuler
     */
    function Gallery(config, overlay, viewportRuler) {
        this.overlay = overlay;
        this.viewportRuler = viewportRuler;
        /**
         * Gallery portal for dialog usage
         */
        this.galleryPortal = new ComponentPortal(GalleryLightboxComponent);
        /**
         * Initial state
         */
        this.initialState = {
            currIndex: 0,
            hasNext: false,
            hasPrev: false,
            play: false
        };
        /**
         * Gallery state
         */
        this.state = this.initialState;
        this.state$ = new BehaviorSubject(this.initialState);
        /**
         * Gallery config
         */
        this.config = defaultConfig;
        this.config$ = new BehaviorSubject(this.config);
        /** Start config worker */
        this.configWorker().subscribe();
        /** Start player worker */
        this.playerWorker().subscribe();
        this.setConfig(config);
    }
    /**
     * Load items and reset the state
     * @param {?} items
     * @return {?}
     */
    Gallery.prototype.load = function (items) {
        this.setState({
            items: items,
            hasNext: items.length > 1
        });
    };
    /**
     * Set active item
     *
     * @param {?} i
     * @return {?}
     */
    Gallery.prototype.set = function (i) {
        this.setState({
            currIndex: i,
            hasNext: i < this.state.items.length - 1,
            hasPrev: i > 0
        });
    };
    /**
     * Next item
     * @return {?}
     */
    Gallery.prototype.next = function () {
        if (this.state.hasNext) {
            var /** @type {?} */ index = this.state.currIndex + 1;
            this.set(index);
        }
        else {
            this.set(0);
        }
    };
    /**
     * Prev item
     * @return {?}
     */
    Gallery.prototype.prev = function () {
        if (this.state.hasPrev) {
            var /** @type {?} */ index = this.state.currIndex - 1;
            this.set(index);
        }
        else {
            this.set(this.state.items.length - 1);
        }
    };
    /**
     * Reset gallery to initial state
     * @return {?}
     */
    Gallery.prototype.reset = function () {
        this.setState(this.initialState);
    };
    /**
     * Set gallery state
     *
     * @param {?} state
     * @return {?}
     */
    Gallery.prototype.setState = function (state) {
        this.state = __assign({}, this.state, state);
        this.state$.next(this.state);
    };
    /**
     * Set gallery config
     *
     * @param {?} config
     * @return {?}
     */
    Gallery.prototype.setConfig = function (config) {
        // if (config.overlay) {
        //   /** Set overlay config */
        //   if (config.overlay.positionStrategy === 'GlobalPositionStrategy') {
        //     this.config.overlay.positionStrategy = new GlobalPositionStrategy().centerHorizontally();
        //   } else {
        //     // ConnectedPositionStrategy
        //     this.config.overlay.positionStrategy = new GlobalPositionStrategy().centerHorizontally();
        //   }
        //
        //   if (config.overlay.scrollStrategy === 'BlockScrollStrategy') {
        //     this.config.overlay.scrollStrategy = new BlockScrollStrategy(this.viewportRuler);
        //   } else if (config.overlay.scrollStrategy === 'NoopScrollStrategy') {
        //     this.config.overlay.scrollStrategy = new NoopScrollStrategy();
        //   } else {
        //     /** TODO: Check if CloseScrollStrategy useful for gallery */
        //     // CloseScrollStrategy
        //     // this.config.overlay.scrollStrategy = new CloseScrollStrategy();
        //   }
        // }
        this.config = mergeDeep(this.config, config);
        /** set overlay config */
        this.overlayConfig = {
            backdropClass: this.config.lightbox.backdropClass,
            panelClass: this.config.lightbox.panelClass,
            hasBackdrop: this.config.lightbox.hasBackdrop,
            positionStrategy: new GlobalPositionStrategy().centerHorizontally(),
            scrollStrategy: new BlockScrollStrategy(this.viewportRuler)
        };
    };
    /**
     * Start slide show
     *
     * @return {?}
     */
    Gallery.prototype.play = function () {
        this.setState({
            play: true
        });
    };
    /**
     * End slide show
     * @return {?}
     */
    Gallery.prototype.stop = function () {
        this.setState({
            play: false
        });
    };
    /**
     * Open gallery in an overlay
     *
     * @param {?=} i
     * @return {?}
     */
    Gallery.prototype.open = function (i) {
        var _this = this;
        if (i === void 0) { i = 0; }
        this.set(i);
        this.overlayRef = this.overlay.create(this.overlayConfig);
        var /** @type {?} */ compRef = this.overlayRef.attach(this.galleryPortal);
        /** Close overlay on backdropClick */
        this.overlayRef.backdropClick().subscribe(function () { return _this.close(); });
        /** Activate keyboard listener */
        compRef.instance.keyDown.subscribe(function (ev) { return _this.handleKeydown(ev); });
    };
    /**
     * Close gallery overlay
     * @return {?}
     */
    Gallery.prototype.close = function () {
        /** Stop player if started */
        this.stop();
        /** If overlay is already opened */
        if (this.overlayRef.hasAttached()) {
            this.overlayRef.dispose();
        }
    };
    /**
     * Handles global key presses while gallery overlay is opened
     *
     * @param {?} event
     * @return {?}
     */
    Gallery.prototype.handleKeydown = function (event) {
        switch (event.keyCode) {
            case LEFT_ARROW:
                this.prev();
                break;
            case RIGHT_ARROW:
            case ENTER:
                this.next();
                break;
            case ESCAPE:
                this.close();
                break;
            default:
                return;
        }
    };
    /**
     * Start player according to the state
     * @return {?}
     */
    Gallery.prototype.playerWorker = function () {
        var _this = this;
        return this.state$.filter(function (state) { return state.play; })
            .switchMap(function () { return Observable.interval(_this.config.player.interval)
            .takeWhile(function () { return _this.state.play; })
            .do(function () { return _this.next(); }); });
    };
    /**
     * Set config async
     * @return {?}
     */
    Gallery.prototype.configWorker = function () {
        var _this = this;
        return this.config$.do(function (config) { return _this.setConfig(config); });
    };
    return Gallery;
}());
export { Gallery };
Gallery.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
Gallery.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [CONFIG,] },] },
    { type: Overlay, },
    { type: ViewportRuler, },
]; };
function Gallery_tsickle_Closure_declarations() {
    /** @type {?} */
    Gallery.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Gallery.ctorParameters;
    /**
     * Gallery portal for dialog usage
     * @type {?}
     */
    Gallery.prototype.galleryPortal;
    /**
     * Initial state
     * @type {?}
     */
    Gallery.prototype.initialState;
    /**
     * Gallery state
     * @type {?}
     */
    Gallery.prototype.state;
    /** @type {?} */
    Gallery.prototype.state$;
    /**
     * Gallery config
     * @type {?}
     */
    Gallery.prototype.config;
    /** @type {?} */
    Gallery.prototype.config$;
    /**
     * Gallery overlay config
     * @type {?}
     */
    Gallery.prototype.overlayConfig;
    /**
     * Gallery overlay ref
     * @type {?}
     */
    Gallery.prototype.overlayRef;
    /** @type {?} */
    Gallery.prototype.overlay;
    /** @type {?} */
    Gallery.prototype.viewportRuler;
}
//# sourceMappingURL=gallery.service.js.map