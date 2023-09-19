
const slider = document.getElementById('user-slider');
const plans = document.querySelectorAll('.card');
const sliderValue = document.getElementById('slider-value');

let users = parseInt(slider.value);
sliderValue.textContent = `${users} Users`;

slider.addEventListener('input', () => {
    users = parseInt(slider.value);
    sliderValue.textContent = `${users} Users`;

    plans.forEach((card, index) => {
        console.log(index)
        const minRange = index * 10;
        const maxRange = (index + 1) * 10;
        if (users > minRange && users <= maxRange) {
            card.classList.add('highlighted-plan');
        } else {
            card.classList.remove('highlighted-plan');
        }
    });
});

const form = document.getElementById("myForm")
const succesmsg = document.getElementById('succesmsg')
const heading = document.getElementById("exampleModalLongTitle")
const clsbtn = document.getElementById("clsbtn")

succesmsg.style.display = 'none'


function formReset() {
    succesmsg.style.display = 'none'
    form.style.display = 'block'
    document.getElementById('name').value = ' ';
    document.getElementById('email').value = ' ';
    document.getElementById('message').value = ' ';

}
clsbtn.addEventListener('click', formReset)

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;



    const formData = {
        firstname: name,
        email: email,
        message: message
    };
    console.log(formData)

    fetch("/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.Success === "Data Added") {
                // heading.innerHTML = "<h3></h3>"
                // form.innerHTML = "<h3>Success</h3>";
                form.style.display = 'none'
                succesmsg.style.display = 'block'
                // form.style.display = 'flex';
                // form.style.fontFamily = 'sans-serif';
                // form.style.justifyContent = 'center';
                // form.style.alignContent = 'center';
            }

        })
        .catch(error => {
            console.error("Error:", error);
        });

    // formReset()

});

