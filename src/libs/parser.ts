const bodyTagContent = new RegExp(/<body[^>]*>(.*?)<\/body>/is);

const parseData = (data) => {
  const parsedHtmlString = data.match(bodyTagContent);

  return parsedHtmlString !== null ? parsedHtmlString[1] : '';
};

export default parseData;
