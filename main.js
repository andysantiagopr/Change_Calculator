function handleClickEvent(e) {
    let amountDue = Number(document.getElementById('amount-due').value);
    let amountReceived = Number(document.getElementById('amount-received').value);
    let change = amountReceived - amountDue;

    change = Number(change.toFixed(2));
    let dollars = Math.floor(change); 
    document.getElementById('dollars-output').textContent = dollars; 
    change = change - dollars; 

    change = Number(change.toFixed(2));
    let quarters = Math.floor(change / .25);
    change = change - quarters * .25; 
    document.getElementById('quarters-output').textContent = quarters; 

    change = Number(change.toFixed(2));
    let dimes = Math.floor(change / .10);
    change = change - dimes * .10;
    document.getElementById('dimes-output').textContent = dimes; 

    change = Number(change.toFixed(2));
    let nickels = Math.floor(change / .05);
    change = change - nickels * .05; 
    document.getElementById('nickels-output').textContent = nickels; 

    change = Number(change.toFixed(2));
    let pennies = Math.floor(change / .01);
    change = change - pennies * .01; 
    document.getElementById('pennies-output').textContent = pennies; 

}

document.getElementById("calculate-change").onclick = handleClickEvent;