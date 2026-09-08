import { useState, useEffect } from 'react';
import { HabboImager } from './components/HabboImager';
import { Palette } from 'lucide-react';
import styles from './App.module.css';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = theme === 'dark' ? 'light' : 'dark';

    if (!('startViewTransition' in document)) {
      setTheme(next);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;

    const root = document.documentElement;
    root.style.setProperty('--beui-vt-origin', `${x}% ${y}%`);
    root.dataset.beuiVt = 'circle-blur';

    const vt = (
      document as Document & {
        startViewTransition(cb: () => void): { finished: Promise<void> };
      }
    ).startViewTransition(() => {
      setTheme(next);
    });

    vt.finished.finally(() => {
      delete root.dataset.beuiVt;
    });
  };

  return (
    <div className={styles.container}>
      <HabboImager />
      <button
        type="button"
        className={styles.themeToggle}
        onClick={toggleTheme}
        title="Toggle Theme"
        aria-label="Toggle Theme"
      >
        <Palette size={24} />
      </button>
    </div>
  );
}

export default App;
