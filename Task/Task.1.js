fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
    let tablebody = document.getElementById('table-body');
    data.forEach(user => {
      let address = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
      let company= `${user.company.name},${user.company.catchPhrase},${user.company.bs}`;
      let row = `<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${address}</td>
        <td>${user.phone}</td>
        <td>${user.website}</td>
        <td>${company}</td>
      </tr>`;
      tablebody.innerHTML += row;
    });
  })
  .catch(error => console.log('Error:', error));
