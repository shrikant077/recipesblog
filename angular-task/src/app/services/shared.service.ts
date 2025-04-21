// shared.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private preferenceClickSource = new Subject<void>();
  preferenceClicked$ = this.preferenceClickSource.asObservable();

  emitPreferenceClick() {
    this.preferenceClickSource.next();
  }
}
