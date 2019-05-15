import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

export function fillInput(value: string, element: DebugElement, fixture?: ComponentFixture<any>) {
    element.nativeElement.value = value;
    element.nativeElement.dispatchEvent(new Event('input'));
    if (fixture) {
        fixture.detectChanges();
    }
}

