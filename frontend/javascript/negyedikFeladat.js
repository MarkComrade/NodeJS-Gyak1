document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('voteBtn1').addEventListener('click', voteFirst);
    document.getElementById('voteBtn2').addEventListener('click', voteSecond);
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

const voteFirst = async () => {

    let optionname = "vote1";

    try{

        const response = await postMethodFetch('/api/vote', {
            optionname: optionname
        })

        console.log(response);

    }catch(error) {
        throw new Error(`Hiba történt: ${error.message}`)
    }
}

const voteSecond = async () => {

    let optionname = "vote2";

    try{

        const response = await postMethodFetch('/api/vote', {
            optionname: optionname
        })

        console.log(response);

    }catch(error) {
        throw new Error(`Hiba történt: ${error.message}`)
    }
}