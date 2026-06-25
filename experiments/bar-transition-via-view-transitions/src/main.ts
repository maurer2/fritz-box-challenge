import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) {
  throw new Error('Root element missing');
}

const linkList = app.querySelector<HTMLUListElement>('.links');
if (!linkList) {
  throw new Error('Nav links missing');
}

const links = [...linkList.querySelectorAll<HTMLAnchorElement>('.link')];

linkList.addEventListener('click', (event) => {
  const newActiveLink = event.target;
  if (!newActiveLink) {
    return;
  }

  document.startViewTransition(() => {
    for (const link of links) {
      if (link === newActiveLink) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  });
});
