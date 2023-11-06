import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer = new Subject<string>();
  private debouncerSubscription!: Subscription;

  @Input('placeholder')
  public placeholder: string = '';

  @Input('initialValue')
  public initialValue: string = '';

  @Output()
  public onDebounce = new EventEmitter<string>();

  @ViewChild('txtSearchInput')
  public txtSearchInput!: ElementRef<HTMLInputElement>;

  get txtSearchInputValue() {
    return this.txtSearchInput.nativeElement.value;
  }

  ngOnInit(): void {

    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription.unsubscribe();
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
