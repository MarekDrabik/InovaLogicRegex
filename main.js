//Marek Drabik

/*Predpokladam:
- ze kazdy riadok ma cislo
- ze "ak riadok nemá množstvo a ani cenu" tak nema ani 'cena spolu', 'dph', 'spolu s DPH'
- z toho volne vyplyva, ze riadok moze byt vyplneny asi len dvoma sposobmi: 
    1. vyplnene vsetky polia 
    2. vyplnene pole c.riadku a nazov, ostatne polia prazdne 
- ze pred kazdou hodnotou ciselnych poli (okrem pola c.riadku) je aspon 1 medzera
*/

let parseLineByLine = require("./parseData");

function vytlacUdajePrazdnehoRiadku(match) {
  const riadok = match[1];
  const nazov = match[2];
  console.log(`Riadok: ${riadok}\nText: ${nazov}`);
}

function vytlacUdajePlnehoRiadku(match) {
  const [riadok, nazov, _, mnozstvo, jednotkaMnozstva, jednCena, cenaSpolu, dph, spoluSDph] = match.slice(1);
  console.log(
    `Riadok: ${riadok}\nNazov: ${nazov}\nMnozstvo: ${mnozstvo} ${jednotkaMnozstva}\nJednotkova cena: ${jednCena}\nCena spolu: ${cenaSpolu}\nDPH: ${dph}\nSpolu s DPH: ${spoluSDph}`
  );
}

function main() {
  const cislo = /\d+(?:\.\d+)?/.source; //cele alebo desatinne cislo
  const cisloRiadka = /\d+/.source; //cele cislo
  const nazovVeci = /.*?/.source;
  const jednotkaMnozstva = /\w+/.source;
  const medzera = /\s/.source;

  const cisleneHodnotyVeci = `${medzera}(${cislo})${medzera}(${jednotkaMnozstva})${medzera}(${cislo})${medzera}(${cislo})${medzera}(${cislo}%)${medzera}(${cislo})`;

  const finalRegex = new RegExp(`^(${cisloRiadka})${medzera}+(${nazovVeci})(${cisleneHodnotyVeci})?$`); //ciselne hodnoty veci su teda tretia skupina

  parseLineByLine().on("line", function (line) {
    const match = finalRegex.exec(line);
    if (match[3] == null) { //udaje veci nie su zadane
      vytlacUdajePrazdnehoRiadku(match);
    } else {
      vytlacUdajePlnehoRiadku(match);
    }
    process.stdout.write('\n')
  });
}

main();
