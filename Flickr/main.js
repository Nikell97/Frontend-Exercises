const form = document.querySelector('form');

form.onsubmit = event => {
    event.preventDefault();

    // Create a URLSearchParams objects to contain all our URL parameters. This will later be turned into a query string automatically with toString().
    const params = new URLSearchParams({
        text: form.elements.text.value,
        orientation: form.elements.orientation.value,
        width: form.elements.width.value,
        height: form.elements.height.value,
    });

    // Turn multiple color codes into a comma-separated list.
    const colorCheckboxes = Array.from(document.querySelectorAll('#colors input[type=checkbox]'));
    const activeColorCheckboxes = colorCheckboxes.filter(c => c.checked);
    const colorValues = activeColorCheckboxes.map(c => c.value);
    const colorString = colorValues.join(',');
    // Flickr doesn't like empty color strings, so only add to URL if non-empty.
    if (colorString) {
        params.append('color_codes', colorString);
    }

    // Turn Date objects from date inputs into Unix timestamps, which Flickr expects.
    const fromDateInput = form.elements.min_taken_date;
    const fromDate = fromDateInput.valueAsDate;
    if (fromDate) {
        const fromTimestamp = Math.floor(fromDate.getTime() / 1000);
        params.append('min_taken_date', fromTimestamp);
    }

    const toDateInput = form.elements.max_taken_date;
    const toDate = toDateInput.valueAsDate;
    if (toDate) {
        const toTimestamp = Math.floor(toDate.getTime() / 1000);
        params.append('max_taken_date', toTimestamp);
    }

    // We prevented the default action, so we need to manually get the Flickr URL from the form and navigate to it, with the query string added.
    const url = form.action + '?' + params.toString();
    location.href = url;
};