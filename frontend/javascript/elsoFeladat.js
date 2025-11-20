document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sendBtn').addEventListener('click', sendMessage)
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

const sendMessage = async () => {
    try {
        const sender = document.getElementById('sender').value;
        const message = document.getElementById('message').value;

        const response = await postMethodFetch('/api/sendMessage', {
            sender: sender,
            message: message
        });

        console.log(response);

        const span = document.getElementById('answer')
        span.innerText = response.message;
        
    } catch(error) {
        console.log('Hiba: ' + error)
    }
}