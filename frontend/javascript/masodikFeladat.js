document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('saveMessageBtn').addEventListener('click', saveMessage)
});

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

const saveMessage = async () => {
    try {

        const message = document.getElementById('saveMessage').value;

        console.log(message)

        if(message !== '') {
            const response = await postMethodFetch('/api/saveData', {
                key: message
            });

            console.log(response);    
            
            const span = document.getElementById('xdlol')
            span.textContent = 'Sikeres mentés';

            setTimeout(() => {
                value.value = "";
                span.innerText = "" 
            }, 2000);

        } else {
            alert('hulye vag')
        }

    } catch(error) {
        console.log('Hiba: ' + error)
    }
}