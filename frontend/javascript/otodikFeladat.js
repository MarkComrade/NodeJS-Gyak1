document.addEventListener('DOMContentLoaded', () => {
    createUnorderedList();

    document.getElementById('postTodo').addEventListener('click', saveTask)
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
        const response = await getMethodFetch('/api/todos');
        console.log(response)
        const data = response.results;

        let ol = document.getElementById('xdlol');
        ol.replaceChildren();
        for(const item of data) {
            let li = document.createElement('li')

            li.textContent = item.task;

            ol.appendChild(li);

            li.addEventListener('click', () => {
                li.setAttribute('class', 'kihuzva')
            });
        }

    } catch (error) {
        console.error('Hiba: ', error)
    }
}

const saveTask = async () => {
    try {

        const task = document.getElementById('saveTask').value;

        console.log(task)

        if(task !== '') {
            const response = await postMethodFetch('/api/todos', {
                task: task
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