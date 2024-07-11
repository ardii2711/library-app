import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/utils/contexts/theme-provider';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  };

  return (
    <Button onClick={toggleTheme} variant="outline" size="icon">
      {currentTheme === 'light' ? <Sun className="h-[1.2rem] w-[1.2rem] transition-all" /> : <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
