document.addEventListener('DOMContentLoaded', () => {
    createUnorderedList();

    document.getElementById('saveNameBtn').addEventListener('click', saveName)
})

const getMethodFetch = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`GET hiba: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Hiba történt: ${error.message}`);
    }
}

const postMethodFetch = async (url, data) => {
    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':  'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`POST hiba: ${response.status} ${response.statusText}`);
    }
    return await response.json();
    } catch (error) {
        throw new Error(`Hiba történt: ${error.message}`);
    }
};

async function createUnorderedList() {
    try {
        const response = await getMethodFetch('/api/names');
        console.log(response)
        const data = response.results;

        let select = document.getElementById('select')
        select.replaceChildren();
        for(const item of data) {
            let option = document.createElement('option')

            option.textContent = item.names;

            select.appendChild(option);
        }
    } catch (error) {
        console.error('Hiba: ', error)
    }

    

}

const saveName = async () => {
    try {

        const names = document.getElementById('saveName').value;

        console.log(names)

        if(names !== '') {
            const response = await postMethodFetch('/api/names', {
                names: names
            });

            console.log(response);    
            
            createUnorderedList();
        } else {
            alert('hulye vag')
        }

        

    } catch(error) {
        console.log('Hiba: ' + error)
    }
}