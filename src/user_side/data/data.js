export var MenuList = [];

  fetch('http://localhost:4000/getMenu', {
    method: 'POST',
    body: JSON.stringify({
        "branch_name": "vadodara"
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {  
          MenuList = data;   
        })
        .catch(error => {
        console.error('Fetch error:', error);
        });