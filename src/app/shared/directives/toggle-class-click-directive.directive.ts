import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToggleClassClickDirective]'
})
export class ToggleClassClickDirectiveDirective {

  private applyClass: boolean = false;
  @Input('appToggleClassClickDirective') toggleClickClass: string = '';

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('document:click', ['$event']) onClick(event: Event) {
    this.applyClass = this.elRef.nativeElement.contains(event.target) ?
      !this.applyClass : false;
    if (/^\s*$/.test(this.toggleClickClass)) {
      return;
    }
    if (this.applyClass) {
      this.renderer.addClass(this.elRef.nativeElement, this.toggleClickClass.trim());
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, this.toggleClickClass.trim());
    }
  }
}
