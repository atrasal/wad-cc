function registerUser(e){
    e.preventDefault();
    let user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        mobile: document.getElementById('mobile').value,
        dob: document.getElementById('dob').value,
        city: document.getElementById('city').value,
        address: document.getElementById('address').value
    };
    let users = JSON.parse(localStorage.getItem('users')) || [];
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(()=>{
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        alert('User registered successfully');
    });
}

function loginUser(e){
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('loginPassword').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let valid = users.find(u =>u.name=== username && u.password === password);
    if(valid){
        alert('Login successful');
        window.location.href = 'data.html';
    }
    else{
        alert('Invalid username or password');
    }
}