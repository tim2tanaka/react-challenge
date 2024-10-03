import { useAppState } from '../app_state/context';
import spinner from '../spinner.svg';

export function Loading() {
  const state = useAppState();
  const loadingClass = state.isloading ? 'loading' : 'loading-hide';
  return (
    <div className={loadingClass}>
      <img src={spinner} className="loading-logo" alt="loading-logo" />
    </div>
  );
}
