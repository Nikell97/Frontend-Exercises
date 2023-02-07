const form = document.querySelector('form');
const resultList = document.querySelector('#results');

form.onsubmit = event => {
    event.preventDefault();

    // Get the values and perform the computation.
    const weight = form.elements.weight.valueAsNumber;
    const height = form.elements.height.valueAsNumber;
    const bmi = weight / (height * height);

    // Add the rounded value in an <li> together with the current time.
    const li = document.createElement('li');
    const date = new Date();
    li.textContent = bmi.toFixed(1) + ' (' + date.toLocaleTimeString() + ') ';
    resultList.prepend(li);

    // Also add a button inside the <li> that, when clicked, removes that <li>.
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remove';
    // Note that each remove button gets its own event handler, and JavaScript "remembers" which <li> we are referring to for each one.
    removeButton.onclick = event => {
        li.remove();
    };
    li.append(removeButton);
};