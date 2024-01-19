async function getExchangeRate() {
    try {
    let response = await fetch('https://api.exchangerate-api.com/v4/latest/JPY');
    let data = await response.json();
    return data.rates.UAH;
    } catch (error) {
    console.error("Error fetching data: ", error);
    }
}   
async function convertToUah() {
    let jpyAmount = document.getElementById('jpyAmount').value;
    let exchangeRate = await getExchangeRate();
    let uahAmount = jpyAmount * exchangeRate; 
    document.getElementById('uahAmount').textContent = uahAmount.toFixed(2);
    }
    document.getElementById('convertButton').addEventListener('click', convertToUah);