import supaBase from "./configration.js";

let lEmail = document.getElementById("email");
let lPass = document.getElementById("password");
let lBtn = document.querySelector(".btn-primary");


//  pasword toggle button

const togglePass = document.querySelector(".toggle-password")

togglePass.addEventListener("click", () => {
    if (lPass.type === "password") {
        lPass.type = "text"
        togglePass.classList.remove("fa-eye-slash")
        togglePass.classList.add("fa-eye")
    } else {
        lPass.type = "password"
        togglePass.classList.remove("fa-eye")
        togglePass.classList.add("fa-eye-slash")
    }
})


async function login(e) {
    e.preventDefault();

    let email = lEmail.value.trim();
    let pass = lPass.value.trim();

    if (!email) {
        Swal.fire({
            title: "Please enter your email address.",
            icon: "warning",
            background: "#f9fbfc",
            color: "#003b46",
            confirmButtonColor: "#003b46",
            confirmButtonText: "OK",
            padding: "20px",
            borderRadius: "15px",
            customClass: {
                popup: "glass-alert"
            }
        });
        return;
    }

    if (!email.includes("@") || !email.includes("gmail.com")) {
        Swal.fire({
            title: "Please enter a valid Gmail address.",
            text: "Example: yourname@gmail.com",
            icon: "warning",
            background: "#f9fbfc",
            color: "#003b46",
            confirmButtonColor: "#003b46",
            confirmButtonText: "OK",
            padding: "20px",
            borderRadius: "15px",
            customClass: {
                popup: "glass-alert"
            }
        }).then(() => {
            lEmail.value = "";
            lPass.value = "";
        })
        return;
    }

    if (!pass) {
        Swal.fire({
            title: "Password field is empty.",
            text: "Please enter your password.",
            icon: "warning",
            background: "#f9fbfc",
            color: "#003b46",
            confirmButtonColor: "#003b46",
            confirmButtonText: "OK",
            padding: "20px",
            borderRadius: "15px",
            customClass: {
                popup: "glass-alert"
            }
        });
        return;
    }

    if (pass.length < 6) {
        Swal.fire({
            title: "Invalid password!",
            text: "Password must be at least 6 characters long.",
            icon: "warning",
            background: "#f9fbfc",
            color: "#003b46",
            confirmButtonColor: "#003b46",
            confirmButtonText: "OK",
            padding: "20px",
            borderRadius: "15px",
            customClass: {
                popup: "glass-alert"
            }
        }).then(() => {
            lPass.value = "";
        })
        return;
    }

    if (email === "admin@gmail.com" && pass === "admin12345") {

        Swal.fire({
            title: "Admin logged in Successfully!",
            icon: "success",
            background: "#f9fbfc",
            color: "#003b46",
            confirmButtonColor: "#003b46",
            confirmButtonText: "Go to DashBoard..",
            padding: "20px",
            borderRadius: "15px",
            customClass: {
                popup: "glass-alert"
            }
        }).then(() => {
            location.href = "dashboard.html";
        });



        return;

    }

    try {

        const { data, error } = await supaBase.auth.signInWithPassword({
            email: email,
            password: pass
        });


        if (error) {
            console.log("Supabase Error: ", error);


            if (error.message.includes("Invalid login credentials")) {
                Swal.fire({
                    title: "Login failed!",
                    text: "Incorrect Email or Password. Please try again.",
                    icon: "error",
                    background: "#f9fbfc",
                    color: "#003b46",
                    confirmButtonColor: "#003b46",
                    confirmButtonText: "Try Again!",
                    padding: "20px",
                    customClass: {
                        popup: "glass-alert"
                    }
                }).then(() => {
                    lEmail.value = "";
                    lPass.value = "";
                })
            }
            else {

                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    background: "#f9fbfc",
                    color: "#003b46",
                    confirmButtonColor: "#003b46",
                    confirmButtonText: "Try Again!",
                    padding: "20px",
                    customClass: {
                        popup: "glass-alert"
                    }
                }).then(() => {
                    lEmail.value = "";
                    lPass.value = "";
                })


            }
            return;
        }

        Swal.fire({
            title: "Successfully logged in!",
            icon: "success",
            background: "#f9fbfc",
            color: "#003b46",
            confirmButtonColor: "#003b46",
            confirmButtonText: "Go to Home",
            padding: "20px",
            customClass: {
                popup: "glass-alert"
            }
        }).then(() => {
            location.href = "home.html";
        });



    } catch (err) {
        console.log(err);
        Swal.fire({
            title: "System error!",
            html: `Something went wrong internally!<br></br> <b> ${(err.message) || "Unknown error"}</b>`,
            icon: "error",
            background: "#f9fbfc",
            color: "#003b46",
            confirmButtonColor: "#003b46",
            confirmButtonText: "Report issue",
            padding: "20px",
            borderRadius: "15px",
            customClass: {
                popup: "glass-alert"
            }
        }).then ( () => {
            lEmail.value = "";
            lPass.value = "";
        })
    }
}


lBtn && lBtn.addEventListener("click", login);
