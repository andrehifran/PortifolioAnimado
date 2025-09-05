document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  
  const updateThemeIcon = () => {
    if (body.classList.contains('light-mode')) {
      // Tema claro: mostra a lua
      moonIcon.classList.remove('theme-icon-hide');
      sunIcon.classList.add('theme-icon-hide');
    } else {
      // Tema escuro: mostra o sol
      sunIcon.classList.remove('theme-icon-hide');
      moonIcon.classList.add('theme-icon-hide');
    }
  };
  
  // Verifica a preferência de tema salva no localStorage ao carregar a página
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.add(savedTheme);
  }
  
  updateThemeIcon(); // Define o ícone inicial
  
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
  
    // Salva a nova preferência de tema no localStorage
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light-mode' : '');
  
    updateThemeIcon(); // Atualiza o ícone no clique
  });

  // Lógica do Carrossel de Depoimentos
  const slidesContainer = document.querySelector('.testimonial-slides');
  if (slidesContainer) {
      const slides = Array.from(slidesContainer.children);
      slides.forEach(slide => {
          const clone = slide.cloneNode(true);
          slidesContainer.appendChild(clone);
      });
  }
});