export default {
  check,
  lookup,
};

var elements;

await loadPeriodicTable();

// ****************************

async function loadPeriodicTable() {
  elements = await (await fetch("periodic-table.json")).json();
}

function check(inputWord) {
  // TODO: determine if `inputWord` can be spelled
  // with periodic table symbols; return array with
  // them if so (empty array otherwise)
  // because
  if (inputWord.length > 0) {
    for (let el of elements) {
      const symbol = el.symbol.toLocaleLowerCase();

      if (symbol.length <= inputWord.length) {
        // did match symbol
        if (inputWord.slice(0, symbol.length) == symbol) {
          // still have chars left
          if (inputWord.length > symbol.length) {
            let res = check(inputWord.slice(symbol.length));
            // match successfully
            if (res?.length) {
              return [symbol, ...res];
            }
          } else {
            return [symbol];
          }
        }
      }
    }
  }

  //return [];
}

function lookup(elementSymbol) {
  // TODO: return the element entry based on specified
  // symbol (case-insensitive)
  return elements.find((v) => v.symbol.toLocaleLowerCase() == elementSymbol);
}
