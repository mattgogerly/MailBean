/**
 * Taken from https://stackoverflow.com/a/40613468/
 */

/* tslint:disable */
import { Directive } from '@angular/core';

@Directive({
  selector: 'webview'
})

/** Dummy directive to allow html-tag 'webview' */
export class WebviewDirective {}
