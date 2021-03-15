import { BehaviorSubject, Observable } from 'rxjs';
import { prepare } from './prepare';
import { finalize, tap } from 'rxjs/operators';

export function indicate<T>(indicator: BehaviorSubject<number>): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> => source.pipe(
    prepare(() => indicator.next(indicator.getValue() + 1)),
    finalize(() => indicator.next(indicator.getValue() - 1)),
  );
}
