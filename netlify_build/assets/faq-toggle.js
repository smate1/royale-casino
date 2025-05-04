// Скрипт для открытия/закрытия элементов FAQ
document.addEventListener('DOMContentLoaded', function() {
  // Находим все элементы FAQ
  const faqItems = document.querySelectorAll('.faq-item');

  // Проходим по каждому элементу и назначаем обработчик клика на вопрос
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', () => {
        // Переключаем класс open для элемента FAQ
        item.classList.toggle('open');

        // Для улучшения UX можно также добавить анимацию
        // или другие эффекты при открытии/закрытии
      });
    }
  });
});
