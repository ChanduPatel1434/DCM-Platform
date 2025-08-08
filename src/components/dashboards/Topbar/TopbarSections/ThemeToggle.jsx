import { useEffect, useState } from 'react';
import { Sun, Moon } from 'react-feather';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('__CONFIG__');
    return saved ? JSON.parse(saved).theme : 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('__CONFIG__', JSON.stringify({ theme: newTheme }));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  return (
    <button className="btn nav-link" onClick={toggleTheme}>
      {theme === 'light' ? <Moon className="align-middle" /> : <Sun className="align-middle" />}
    </button>
  );
};

export default ThemeToggle;