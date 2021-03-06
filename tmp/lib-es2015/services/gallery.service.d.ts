import { ViewportRuler } from '@angular/cdk/scrolling';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import { GalleryLightboxComponent } from '../components/gallery-lightbox/gallery-lightbox.component';
import { GalleryState, GalleryConfig, GalleryItem } from '../models';
export declare class Gallery {
    private overlay;
    private viewportRuler;
    /** Gallery portal for dialog usage */
    galleryPortal: ComponentPortal<GalleryLightboxComponent>;
    /** Initial state */
    private initialState;
    /** Gallery state */
    state: GalleryState;
    state$: BehaviorSubject<GalleryState>;
    /** Gallery config */
    config: GalleryConfig;
    config$: BehaviorSubject<GalleryConfig>;
    /** Gallery overlay config */
    overlayConfig: OverlayConfig;
    /** Gallery overlay ref */
    overlayRef: OverlayRef;
    constructor(config: GalleryConfig, overlay: Overlay, viewportRuler: ViewportRuler);
    /** Load items and reset the state */
    load(items: GalleryItem[]): void;
    /** Set active item
     * @param {number} i Active Index
     **/
    set(i: number): void;
    /** Next item */
    next(): void;
    /** Prev item */
    prev(): void;
    /** Reset gallery to initial state */
    reset(): void;
    /** Set gallery state
     * @param {GalleryState} state
     **/
    setState(state: GalleryState): void;
    /** Set gallery config
     * @param {GalleryConfig} config
     **/
    setConfig(config: GalleryConfig): void;
    /** Start slide show
     * @param {number} interval Time in ms before setting the next item
     **/
    play(): void;
    /** End slide show */
    stop(): void;
    /** Open gallery in an overlay
     * @param {number} i Image index
     **/
    open(i?: number): void;
    /** Close gallery overlay */
    close(): void;
    /** Handles global key presses while gallery overlay is opened
     * @param {KeyboardEvent} event
     **/
    handleKeydown(event: KeyboardEvent): void;
    /** Start player according to the state */
    playerWorker(): Observable<number>;
    /** Set config async */
    configWorker(): Observable<GalleryConfig>;
}
