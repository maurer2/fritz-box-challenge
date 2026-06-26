import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) {
  throw new Error('Root element missing');
}
const linkList = app.querySelector<HTMLUListElement>('.links');
if (!linkList) {
  throw new Error('Nav links missing');
}
const links = new Set(linkList.querySelectorAll<HTMLAnchorElement>('.link'));
const sections = new Set(app.querySelectorAll<HTMLElement>('.section'));

const setActiveLink = (activeLink: HTMLAnchorElement): void => {
  const nonActiveLinks = links.difference(new Set([activeLink]));

  nonActiveLinks.forEach((link) => link.removeAttribute('aria-current'));
  activeLink.setAttribute('aria-current', 'page');
};

const setActiveSection = (targetSectionId: string): void => {
  const activeSection = app.querySelector<HTMLElement>(targetSectionId);
  if (!activeSection) {
    return;
  }

  const nonActiveSections = sections.difference(new Set([activeSection]));

  nonActiveSections.forEach((section) => (section.hidden = true));
  activeSection.hidden = false;
};

linkList.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const newActiveLink = event.target.closest<HTMLAnchorElement>('.link');
  const newTargetId = newActiveLink?.getAttribute('href');

  if (!newActiveLink || !newTargetId) {
    throw new Error('New link missing or incorrect link target');
  }

  document.startViewTransition(() => {
    setActiveLink(newActiveLink);
    setActiveSection(newTargetId);
  });
});
