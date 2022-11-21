import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns as townNames } from './towns.js'

const main = document.getElementById('towns');
const input = document.getElementById('searchText');
const output = document.getElementById('result');
const button = document.querySelector('button');
button.addEventListener('click', onSerch);

const towns = townNames.map(t => ({ name: t, match: false }));

const townTempalte = (towns) => html`
<ul>
   ${towns.map(t => html`<li class=${t.match ? 'active' : ''}>${t.name}</li>`)}
</ul>`

function update() {
   render(townTempalte(towns), main);
}

update();

function onSerch() {
   const match = input.value.trim().toLocaleLowerCase();
   let allMatches = 0;

   for (let town of towns) {
      if (match && town.name.toLocaleLowerCase().includes(match)) {
         town.match = true;
         allMatches++;
      } else {
         town.match = false;
      }
   }

   output.textContent = `${allMatches} matches found`;

   update();
}