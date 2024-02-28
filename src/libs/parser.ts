const bodyTagContent = /<body[^>]*>(.*?)<\/body>/is;

const parseData = (data: unknown): string | null => {
  if (typeof data !== 'string') {
    return null;
  }

  const parsedHtmlString = data.match(bodyTagContent);

  return parsedHtmlString !== null ? parsedHtmlString[1] : null;
};

export default parseData;
