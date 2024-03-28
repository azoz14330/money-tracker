const calculateBalance = async ()=>{
    let balance = await fetch('http://localhost:5000/balance-spent');
    let b = await balance.json();
    b = await b.balance.toFixed(2);
    return b;
  }
  
  const showBalance = async () =>{
    let balance = document.getElementById('balance');
    balance.innerText = balance.innerText +' '+ await calculateBalance() +' SAR';
    console.log(await calculateBalance())
  }
showBalance();

const form = document.getElementById('dataForm');
const close = document.getElementById('modal-close-btn');
const modal = document.getElementById('add-modal');
const add = document.getElementById('add');
const container = document.getElementById('modal-container');
add.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('hidden');
})
close.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('hidden');
})
container.addEventListener('click', (e) => {
    if(e.target === container){
        modal.classList.add('hidden');
    }
})
form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const formData = {
        date: form.date.value,
        category: form.category.value,
        amount: form.amount.value,
        currency: form.currency.value,
        description: form.description.value,
        recurring: form.recurring.checked? 1: 0,
        type : form.type.value.toLowerCase(),
    };
    try {
        const response = await fetch('/add-data',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData),
        })
        if(!response.ok){
            console.log(`Error ${response.status}`);
        }else{
            const result = await response.json();
            console.log(result);
            form.reset();
            addTime();
            showBalance();
        }
    } catch (error) {
        console.log(error);
    }
})


const addTime = () =>{
    var now = new Date();
    var month = now.getMonth() + 1; // getMonth() is zero-based
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    var dateTimeLocalValue = now.getFullYear() + '-' + month + '-' + day + 'T' + hour + ':' + minute;
    document.getElementById('date').value = dateTimeLocalValue;
}
addTime();