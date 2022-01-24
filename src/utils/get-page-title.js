import defaultSettings from '@/settings';

const title = defaultSettings.title || '嘉谷肽业';

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
