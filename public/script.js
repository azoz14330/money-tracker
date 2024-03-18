document.getElementById('fetchButton').addEventListener('click', async () => {
  try{
    const reset = document.getElementById('clear');
    reset.classList.remove('hidden')
    reset.addEventListener('click', ()=>{
      itemsContainer.innerHTML = '';
      reset.classList.add('hidden');
    })
    let response = await fetch('http://localhost:5000/items');
    response = await response.json();
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = ''; // Clear previous items
    response.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.textContent = `Date: ${item.Date.replace('T','   ').replace('Z', ' UTC')},           Amount: ${item.Amount}, Spent on            ${item.Category}`; // Adjust based on your table columns
      itemsContainer.appendChild(itemElement);
    });
  }
  catch(error){
    console.log(error)
  };
  });
  