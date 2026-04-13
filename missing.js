const D = document;
const body = D.body;

function updateMissingList()
{
    fetch('./data/missing/missing.json?t=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            const listContainer = document.getElementById('missing-list');
            listContainer.innerHTML = ''; // Clear the "Loading..." text

            if (data.length === 0)
	    {
                listContainer.innerHTML = '<li>All participants are present!</li>';
            }
	    else
	    {
                data.forEach(name =>
		{
                    const li = document.createElement('li');
                    li.textContent = name;
                    listContainer.appendChild(li);
                });
            }
        })
        .catch(err => console.error('Error loading missing list:', err));
}

setInterval(updateMissingList, 3000);

