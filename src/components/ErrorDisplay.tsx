import { useAppState } from '../app_state/context';

export function ErrorDisplay() {
  const state = useAppState();
  return (
    <div>
      <span className="error-msg"> {state.errorMsg} </span>
    </div>
  );
}
