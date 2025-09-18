export class ThemeManager {
  static themes = ['dark', 'light', 'blue', 'neon'];
  
  static init() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.setTheme(savedTheme);
  }
  
  static setTheme(theme) {
    if (!this.themes.includes(theme)) theme = 'dark';
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }
  
  static getTheme() {
    return typeof window !== 'undefined' ? localStorage.getItem('theme') || 'dark' : 'dark';
  }
  
  static getCurrentTheme() {
    return this.getTheme();
  }
  
  static cycleTheme() {
    const current = this.getTheme();
    const currentIndex = this.themes.indexOf(current);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.setTheme(this.themes[nextIndex]);
  }
}