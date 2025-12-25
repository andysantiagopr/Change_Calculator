
//Array of values for dollars and coins. Separated to make it easier to work without decimal points. 

const denominations = [
    ['One-hundred dollar', 100],
    ['Fifty dollar', 50],
    ['Twenty dollar', 20],
    ['Ten dollar', 10],
    ['Five dollar', 5],
    ['One dollar', 1],
    ['Quarters', .25],
    ['Dimes', .10],
    ['Nickels', .05],
    ['Pennies', .01]
];

const activeDenominations = [];

//Dynamic HTML creation for multi-select dropdown menu. 

const denControlEl = document.getElementById('denomination-controls'); 
const divEl = document.getElementById('change-class');

denominations.forEach(denomination => {
    const divEl = document.createElement('div');
    const inputEl = document.createElement('input');
    const labelEl = document.createElement('label');
    inputEl.type = 'checkbox';
    inputEl.id = `${denomination[0]}-option`;
    inputEl.checked = true; //This line makes sure the checkbox is already selected by default
    inputEl.dataset.value = denomination[1];  // store numeric value
    inputEl.dataset.name = denomination[0];   // store label/name
    inputEl.addEventListener("change", updateActiveDenominations); //When they uncheck the box it will trigger the updateActiveDenominations function. 
    labelEl.htmlFor = inputEl.id; //links the label to checkbox input. Allows to write less code. It would look like this without this html.for: label.addEventListener("click", () => input.checked = !input.checked);
    labelEl.textContent = denomination[0];
    divEl.id = `${denomination[0]}-checkbox`;
    denControlEl.append(divEl);
    divEl.append(inputEl, labelEl);
});

//Function to recalculate which denominations are currently enabled (checked) and store them into activeDenominations.

function updateActiveDenominations() {
 
  activeDenominations.length = 0; //Makes sure the array resets. 
  const checkboxes = denControlEl.querySelectorAll('input[type="checkbox"]'); // grab all checkboxes inside the container
  checkboxes.forEach(cb => { // rebuild activeDenominations based on what's checked
    if (cb.checked) {
      activeDenominations.push([
        cb.dataset.name,
        Number(cb.dataset.value)
      ]);
    }
  });

  activeDenominations.sort((a, b) => b[1] - a[1]); // sort AFTER the loop to make the denominations stay in order of highest denomination to lowest. 
}

updateActiveDenominations();

//Dynamic HTML creation for h2 and p elements making it easier to modify and add more content later. 
//const divEl = document.getElementById('change-class');

denominations.forEach(denomination => {
    const rowEl = document.createElement('div');
    rowEl.id = `${denomination[0]}-row`;
    rowEl.style.display = 'none'; //Hide the row until button is clicked

    const h2El = document.createElement('h2');
    h2El.textContent = denomination[0];

    const pEl = document.createElement('p');
    pEl.id = `${denomination[0]}-output`;
    pEl.textContent = '0';

    rowEl.appendChild(h2El);
    rowEl.appendChild(pEl);
    divEl.appendChild(rowEl);
});

    const pEl = document.createElement('p');
    const labelEl = document.getElementById('discount-text');
    labelEl.append(pEl);

function handleClickEvent(e) {

    const militaryDiscount = document.getElementById('discount-checkbox');
    let amountDue = Number(document.getElementById('amount-due').value); 

    //Military Discount Option
    if (militaryDiscount.checked) {
        amountDue -= (amountDue * 0.1); //Military discount set to 10% but can be modified to the business preference. 
        document.getElementById("military-banner").style.display = "block";
        pEl.textContent = `Total amount due with military discount: $${(amountDue).toFixed(2)}`;
        
    } else {
        document.getElementById("military-banner").style.display = "none";
    }

    let amountReceived = Number(document.getElementById('amount-received').value);

    const cheemsBonk = document.getElementById("cheems-bonk");

    if (amountReceived < amountDue) {
        return cheemsBonk.style.display = "block";
        
    }
    cheemsBonk.style.display = "none";

    let result = Number((amountReceived - amountDue).toFixed(2)); 

    //Math Calculation for Change
    for (let i = 0; i < activeDenominations.length; i++) {
        const denominationName = activeDenominations[i][0];
        const denominationValue = activeDenominations[i][1];
        const count = Math.floor(result / denominationValue); 
        result -= count * denominationValue;
        document.getElementById(`${denominationName}-output`).textContent = count;

        //Section to only show the denominations which value is not 0
        const rowEl = document.getElementById(`${denominationName}-row`);
        rowEl.style.display = (count > 0) ? 'block' : 'none';
        }

        //
        denominations.forEach(([name]) => {
        const isActive = activeDenominations.some(([activeName]) => activeName === name);
        if (!isActive) {
        document.getElementById(`${name}-output`).textContent = 0;
        document.getElementById(`${name}-row`).style.display = 'none';
        }
    });
    }

document.getElementById("calculate-change").onclick = handleClickEvent; 

//let change = result; //dollarChange previously

/*
for (let i = 0; i < dollars.length; i++) {
    const dollarName = dollars[i][0]; 
    const dollarValue = dollars[i][1];
    const count = Math.floor(dollarsChange / dollarValue);
    dollars[i][2] = count;
    dollarsChange -=  count * dollarValue;
    console.log('line 66', dollarsChange, count, dollarValue);
    document.getElementById(`${dollarName}-output`).textContent = count;
    } 

//let coinsChange = (result - dollars[0][2] * 100 - dollars[1][2] * 50 - dollars[2][2] * 20 - dollars[3][2] * 10 - dollars[4][2] * 5 - dollars[5][2] * 1);

    let coinsChange = dollarsChange; 
console.log(result, dollarsChange, coinsChange);
for (let i = 0; i < coins.length; i++) {
    const coinName = coins[i][0]; 
    const coinValue = coins[i][1];
    const count = Math.floor(coinsChange / coinValue);
    console.log(count);
    coinsChange -=  count * coinValue;
    document.getElementById(`${coinName}-output`).textContent = count;
    } 
} 

document.getElementById("calculate-change").onclick = handleClickEvent; */

//Function to get change in 100, 50, 25, 10, 5 and 1 dollar bills. Then in the calculate function it will show and hide depending if the bill has an amount other than 0. 

/*const divEl = document.getElementById('change-class');

denominations.forEach(denomination => {
    let name = denomination[0];
    let h2El = document.createElement('h2'); 
    h2El.value = denomination[0];
    h2El.textContent = `${name}`;
    divEl.appendChild(h2El); 
    let pEl = document.createElement('p');
    pEl.id = `${name}-output`;
    pEl.value = 0;
    pEl.textContent = 0;
    divEl.appendChild(pEl); 
});
*/

/*
const dollarEl = document.getElementById('dollars');

dollars.forEach(dollar => {
    let name = dollar[0];
    let h2El = document.createElement('h2'); 
    h2El.value = dollar[0];
    h2El.textContent = `${name} dollar bill`;
    dollarsEl.appendChild(h2El); 
    let pEl = document.createElement('p');
    pEl.id = `${name}-output`;
    pEl.value = 0;
    pEl.textContent = 0;
    dollarsEl.appendChild(pEl);
});

const coinsEl = document.getElementById('coins');

coins.forEach(coin => {
    let name = coin[0];
    let h2El = document.createElement('h2');
    h2El.value = coin[0];
    h2El.textContent = name;
    coinsEl.appendChild(h2El); 
    let pEl = document.createElement('p');
    pEl.id = `${name}-output`;
    pEl.value = 0;
    pEl.textContent = 0;
    coinsEl.appendChild(pEl);
});
*/

//Functions 