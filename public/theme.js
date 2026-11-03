// Тема до загрузки React: сохранённая в localStorage, на телефоне всегда тёмная.
// Отдельный файл, а не <script> в index.html, чтобы Content-Security-Policy разрешала только свои скрипты.
try {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
  if (matchMedia('(max-width:700px)').matches) document.documentElement.setAttribute('data-theme', 'dark');
} catch (error) {}
