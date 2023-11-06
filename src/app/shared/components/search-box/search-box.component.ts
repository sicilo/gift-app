import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @Output()
  public onValue = new EventEmitter<string>();

  @ViewChild('txtSearchInput')
  public txtSearchInput!: ElementRef<HTMLInputElement>;

  get txtSearchInputValue() {
    return this.txtSearchInput.nativeElement.value;
  }

  @Input('placeholder')
  public placeholder: string = '';

  emitValue(): void {
    if (this.txtSearchInputValue.length === 0) return;

    this.onValue.emit(this.txtSearchInputValue)
  }
}
