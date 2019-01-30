const parseData = (data) => {
  const regex = new RegExp(/<body[^>]*>(.*?)<\/body>/is);
  const parsedHtmlString = data.match(regex);

  return (parsedHtmlString !== null) ? parsedHtmlString[1] : '';
};

export default parseData;
