function getInscriptionsFromCSVData(fullText, firstRowForTitles = false) {
    const rows = [];
    for (const text of fullText.split('\n')){
    rows.push(text.match( /\s*(\"[^"]*\"|'[^']*'|[^,]*)\s*(,|$)/g ).map( function (text_) {
        if (text_[text_.length -1] === ',') text_ = text_.slice(0, text_.length - 1);
        if (text_[0] === '"' && text_[text_.length -1] === '"') text_ = text_.slice(1, text_.length - 1);
        return text_;
      } ));
    }
    if (firstRowForTitles) rows.shift();
    return rows;
}

const CSVToArray = (data, omitFirstRow = false, delimiter = ',') =>
  data
    .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
    .split('\n')
    .map(v => v.split(delimiter));