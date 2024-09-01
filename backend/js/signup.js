const signup = async () => {
    const url = "http://localhost:5000/api/signup";
    const user = {
        username: "Ghs Julian",
        email: "ghsjulian@gmail.com",
        password: "123456"
    };
    try {
        const sendData = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        const response = await sendData.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
signup();
