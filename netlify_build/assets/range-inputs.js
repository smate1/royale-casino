// Функціональність для input range повзунків на сторінках ігор
document.addEventListener('DOMContentLoaded', function() {
  // Обробник для повзунка ставки та відповідного числового поля
  const betSlider = document.getElementById('bet-slider');
  const betAmount = document.getElementById('bet-amount');

  if (betSlider && betAmount) {
    // Функція для оновлення суми ставки при зміні повзунка
    betSlider.addEventListener('input', function() {
      betAmount.value = this.value;
      updatePotentialWin();
    });

    // Функція для оновлення повзунка при зміні числового поля
    betAmount.addEventListener('input', function() {
      // Обмежуємо значення мін/макс параметрами
      const min = parseInt(betSlider.min);
      const max = parseInt(betSlider.max);
      let value = parseInt(this.value) || min;

      if (value < min) value = min;
      if (value > max) value = max;

      this.value = value;
      betSlider.value = value;
      updatePotentialWin();
    });
  }

  // Обробник для повзунка цільового числа (для гри Dice)
  const targetSlider = document.getElementById('target-slider');
  const targetValue = document.getElementById('target-value');

  if (targetSlider && targetValue) {
    targetSlider.addEventListener('input', function() {
      targetValue.textContent = this.value;
      updatePotentialWin();
    });
  }

  // Обробники для кнопок типу ставки (для гри Dice)
  const betUnder = document.getElementById('bet-under');
  const betOver = document.getElementById('bet-over');
  const condition = document.getElementById('condition');

  if (betUnder && betOver && condition) {
    betUnder.addEventListener('click', function() {
      betUnder.classList.add('active');
      betOver.classList.remove('active');
      condition.textContent = 'меньше';
      updatePotentialWin();
    });

    betOver.addEventListener('click', function() {
      betOver.classList.add('active');
      betUnder.classList.remove('active');
      condition.textContent = 'больше';
      updatePotentialWin();
    });
  }

  // Обробники для кнопок кількості мін (для гри Mines)
  const minesButtons = document.querySelectorAll('.mines-count-buttons .bet-type-btn');
  const minesCountValue = document.getElementById('mines-count-value');

  if (minesButtons.length > 0 && minesCountValue) {
    minesButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Прибираємо активний клас з усіх кнопок
        minesButtons.forEach(btn => btn.classList.remove('active'));
        // Додаємо активний клас поточній кнопці
        this.classList.add('active');
        // Оновлюємо значення кількості мін
        minesCountValue.textContent = this.dataset.mines;
        updatePotentialWin();
      });
    });
  }

  // Функція для обчислення та оновлення можливого виграшу
  function updatePotentialWin() {
    const potentialWin = document.getElementById('potential-win');
    const multiplier = document.getElementById('multiplier');
    const nextMultiplier = document.getElementById('next-multiplier');

    // Якщо є елементи для оновлення виграшу для гри Dice
    if (betAmount && potentialWin && multiplier) {
      let betValue = parseInt(betAmount.value) || 0;
      let mult = 1.98; // Базовий коефіцієнт для Dice

      // Для гри Dice враховуємо цільове число
      if (targetSlider) {
        const targetVal = parseInt(targetSlider.value);
        const isUnder = document.getElementById('bet-under')?.classList.contains('active');

        // Обчислюємо мультиплікатор на основі шансу
        if (isUnder) {
          mult = 99 / targetVal;
        } else {
          mult = 99 / (99 - targetVal);
        }

        // Оновлюємо шанс виграшу для Dice
        const winChance = document.getElementById('win-chance');
        if (winChance) {
          if (isUnder) {
            winChance.textContent = targetVal.toFixed(1) + '%';
          } else {
            winChance.textContent = (99 - targetVal).toFixed(1) + '%';
          }
        }
      }

      // Обмежуємо мультиплікатор до 2 знаків після коми
      mult = Math.floor(mult * 100) / 100;

      // Обчислюємо потенційний виграш
      const win = betValue * mult;

      // Оновлюємо відображення
      if (potentialWin) potentialWin.textContent = '₽' + win.toFixed(2);
      if (multiplier) multiplier.textContent = 'x' + mult.toFixed(2);
    }

    // Для гри Mines - оновлення наступного коефіцієнта
    if (nextMultiplier) {
      // Беремо кількість мін з відображення
      const minesCount = parseInt(document.getElementById('mines-count-value')?.textContent || '5');

      // Обчислюємо базовий коефіцієнт для першого ходу в Mines
      // Формула: 25 / (25 - mines) * 0.95 (5% комісія)
      const nextMult = (25 / (25 - minesCount)) * 0.95;
      nextMultiplier.textContent = 'x' + nextMult.toFixed(2);
    }
  }

  // Початкове оновлення потенційного виграшу
  updatePotentialWin();
});
