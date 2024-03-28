const formatTime = (stamp) =>{
  stamp = stamp.split(':');
  let hour = '';
  if(Number(stamp[0]) - 12 >= 0){
    stamp[0] = Number(stamp[0]) - 12
    hour = 'PM';
  }else{
    hour = 'AM';
  }
  if(stamp[0] == 0) stamp[0] = 12;
  return `${stamp[0]}:${stamp[1]} ${hour}`;
}
const addTableData = (obj) =>{
  let row = document.createElement('tr');
  let child1 = document.createElement('td');
  let childTime = document.createElement('td');
  let child2 = document.createElement('td');
  let child3 = document.createElement('td');
  child1.innerText = obj.Date.split('T')[0];
  row.appendChild(child1);
  child2.innerText = obj.Amount;
  childTime.innerText = formatTime(obj.Date.split('T')[1].replace('Z',''));
  row.appendChild(childTime);
  row.appendChild(child2);
  child3.innerText = obj.Category;
  row.appendChild(child3);
  return row;
}
document.getElementById('fetchButton').addEventListener('click', async () => {
  try{
    let response = await fetch('http://localhost:5000/items');
    response = await response.json();
    console.log(response);
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = ''; // Clear previous items
    let items = ['Date','Time', 'Amount', 'Category'];
    const tableHead = document.createElement('tr');
    items.forEach((e) => {
      const headElement = document.createElement('th');
      headElement.innerText = e;
      tableHead.appendChild(headElement);
    })
    itemsContainer.appendChild(tableHead)
    response.forEach(item => {
      itemsContainer.appendChild(addTableData(item));
    });
    const reset = document.getElementById('clear');
    reset.classList.remove('hidden')
    reset.addEventListener('click', ()=>{
      itemsContainer.innerHTML = '';
      reset.classList.add('hidden');
    })
  }
  catch(error){
    console.log(error)
  };
  });
  