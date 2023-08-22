import data from './data.json';
const $dashboardList = document.getElementById('dashboard__list');
const $templateCard = document.getElementById('template-card').content;

const $dashboardCards = document.getElementById('dashboard__cards');
const fragment = document.createDocumentFragment();

const imagePaths = [
  'public/icon-1.svg',
  'public/icon-2.svg',
  'public/icon-3.svg',
  'public/icon-4.svg',
  'public/icon-5.svg',
  'public/icon-6.svg',
];
// mientras $dashboardCards.firstChild sea verdadero se irá eliminando
const clearDashboard = () => {
  while ($dashboardCards.firstChild) {
    $dashboardCards.firstChild.remove();
  }
};

const _dashboardTemplate = (frequency) => {
  clearDashboard();
  const cards = data.map((item, index) => {
    const clone = $templateCard.cloneNode(true);

    clone.querySelector('.iconImg').src = imagePaths[index];
    clone.getElementById('title').textContent = item.title;
    clone.getElementById(
      'current'
    ).textContent = `${item.timeframes[frequency].current}hrs`;
    clone.getElementById('previous').textContent =
      item.timeframes[frequency].previous;

    return clone;
  });
  fragment.append(...cards);
  $dashboardCards.append(fragment);
};

const _dashboardShow = () => {
  document.addEventListener('DOMContentLoaded', () => {
    _dashboardTemplate('weekly');
  });
  $dashboardList.addEventListener('click', (event) => {
    if (event.target.textContent === 'Daily') {
      return _dashboardTemplate('daily');
    }
    if (event.target.textContent === 'Weekly') {
      return _dashboardTemplate('weekly');
    }
    if (event.target.textContent === 'Monthly') {
      return _dashboardTemplate('monthly');
    }
  });
};
export { _dashboardShow };
