import { HeaderProps } from '../types';

export function Header({ title }: HeaderProps) {
  return (
    <header className="app-header">
      <h2>{title}</h2>
    </header>
  );
}
