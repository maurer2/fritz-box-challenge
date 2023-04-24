const bodyTagContent = /<body[^>]*>(.*?)<\/body>/is;

const parseData = (data: string): string | null => {
  const parsedHtmlString = data.match(bodyTagContent);

  return parsedHtmlString !== null ? parsedHtmlString[1] : null;
};

export default parseData;
