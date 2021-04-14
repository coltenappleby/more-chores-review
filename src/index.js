

// Global Variables
const choresList = document.querySelector('div#chore-list') //div.col-md-12
document.addEventListener('DOMContentLoaded', () => {
    
    displayAllChores()

    choresList.addEventListener('click', event => {

        console.log(choresList)
       

        if(event.target.matches('button')) {
            console.log(event.target.dataset.id)

            const fetchObj = {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(event.target)
            }
            
            fetch(`http://localhost:3000/chores/${event.target.dataset.id}`, fetchObj)
                .then(res => res.json())
                .then(allJSONs => {

                    choresList.innerHTML = ``

                    displayAllChores()
                });
                


        }

        console.log(choresList)

    
    });

    const newChoreForm = document.querySelector('form#new-chore-form')

    newChoreForm.addEventListener('click', event => {
        
        event.preventDefault()
        if(event.target.matches('button')) {
            console.log(newChoreForm)
            createNewChore(newChoreForm)

        }
    
    
    })


});

function displayAllChores() {
    
    fetch('http://localhost:3000/chores')
    .then(res => res.json())
    .then(allJSONs => {
        
        allJSONs.forEach(displayChores);

        console.log(allJSONs)
    });

}


function displayChores(choreJSON) {

    choreCard = document.createElement('div')
    choreCard.className = 'chore-card'

    // console.log(choreCard)

    choreCard.dataset.id = choreJSON.id

    // let input = document.createElement('input')
    // input.value = choreJSON.priority

    choreCard.innerHTML = `
        <button class='delete-button' data-id = ${choreJSON.id}>x</button>
        <h3> ${choreJSON.title} </h3>
        <p> Duration: ${choreJSON.duration} </p>
        <input type='text' value=${choreJSON.priority} />
    `
    choresList.append(choreCard)
};

function deleteChore() {}

function createNewChore(newChoreForm) {

    const title = newChoreForm.title.value  
    const priority = newChoreForm.priority.value
    const duration = newChoreForm.duration.value

    let newChore = {title, priority, duration}

    const fetchObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newChore)
    }
    
    fetch('http://localhost:3000/chores', fetchObj)
        .then(res => res.json())
        .then(displayChores)

    newChoreForm.reset()


}