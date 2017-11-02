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
export class Gallery {
    /**
     * @param {?} config
     * @param {?} overlay
     * @param {?} viewportRuler
     */
    constructor(config, overlay, viewportRuler) {
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
    load(items) {
        this.setState({
            items: items,
            hasNext: items.length > 1
        });
    }
    /**
     * Set active item
     *
     * @param {?} i
     * @return {?}
     */
    set(i) {
        this.setState({
            currIndex: i,
            hasNext: i < this.state.items.length - 1,
            hasPrev: i > 0
        });
    }
    /**
     * Next item
     * @return {?}
     */
    next() {
        if (this.state.hasNext) {
            const /** @type {?} */ index = this.state.currIndex + 1;
            this.set(index);
        }
        else {
            this.set(0);
        }
    }
    /**
     * Prev item
     * @return {?}
     */
    prev() {
        if (this.state.hasPrev) {
            const /** @type {?} */ index = this.state.currIndex - 1;
            this.set(index);
        }
        else {
            this.set(this.state.items.length - 1);
        }
    }
    /**
     * Reset gallery to initial state
     * @return {?}
     */
    reset() {
        this.setState(this.initialState);
    }
    /**
     * Set gallery state
     *
     * @param {?} state
     * @return {?}
     */
    setState(state) {
        this.state = Object.assign({}, this.state, state);
        this.state$.next(this.state);
    }
    /**
     * Set gallery config
     *
     * @param {?} config
     * @return {?}
     */
    setConfig(config) {
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
    }
    /**
     * Start slide show
     *
     * @return {?}
     */
    play() {
        this.setState({
            play: true
        });
    }
    /**
     * End slide show
     * @return {?}
     */
    stop() {
        this.setState({
            play: false
        });
    }
    /**
     * Open gallery in an overlay
     *
     * @param {?=} i
     * @return {?}
     */
    open(i = 0) {
        this.set(i);
        this.overlayRef = this.overlay.create(this.overlayConfig);
        const /** @type {?} */ compRef = this.overlayRef.attach(this.galleryPortal);
        /** Close overlay on backdropClick */
        this.overlayRef.backdropClick().subscribe(() => this.close());
        /** Activate keyboard listener */
        compRef.instance.keyDown.subscribe((ev) => this.handleKeydown(ev));
    }
    /**
     * Close gallery overlay
     * @return {?}
     */
    close() {
        /** Stop player if started */
        this.stop();
        /** If overlay is already opened */
        if (this.overlayRef.hasAttached()) {
            this.overlayRef.dispose();
        }
    }
    /**
     * Handles global key presses while gallery overlay is opened
     *
     * @param {?} event
     * @return {?}
     */
    handleKeydown(event) {
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
    }
    /**
     * Start player according to the state
     * @return {?}
     */
    playerWorker() {
        return this.state$.filter(state => state.play)
            .switchMap(() => Observable.interval(this.config.player.interval)
            .takeWhile(() => this.state.play)
            .do(() => this.next()));
    }
    /**
     * Set config async
     * @return {?}
     */
    configWorker() {
        return this.config$.do((config) => this.setConfig(config));
    }
}
Gallery.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
Gallery.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [CONFIG,] },] },
    { type: Overlay, },
    { type: ViewportRuler, },
];
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