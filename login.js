import supaBase from "./configration.js";

let lEmail = document.getElementById("email");
let lPass = document.getElementById("password");
let lBtn = document.querySelector("#login-btn");


//  pasword toggle button

const togglePass = document.querySelector(".toggle-password")
  function toggleIcon(){
 
    if (lPass.type === "password") {
        lPass.type = "text"
        togglePass.classList.remove("fa-eye-slash")
        togglePass.classList.add("fa-eye")
    } else {
        lPass.type = "password"
        togglePass.classList.remove("fa-eye")
        togglePass.classList.add("fa-eye-slash")
    }
}

 togglePass &&togglePass.addEventListener("click", toggleIcon)


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



                        //    FORGET PASSWORD FUNCINALITY


const resetBtn = document.getElementById("resetBtn");
 const resEmail = document.getElementById("reset-email");


async function reset(){

    if (!resEmail.value) {
        alert("Please enter an email");
       return
    }
   
  
    const { data, error } = await supaBase.auth.resetPasswordForEmail(resEmail.value, {
        redirectTo: "https://azkaazeem.github.io/Login-page---Update-Password-page" 
      
    });

    if (error) {
        alert("Error: " + error.message);
    } else {
        alert("Reset link sent to your email!");
    }
};

resetBtn && resetBtn.addEventListener("click", reset)







// ADD UPDATE PASSWORD FUNCTIONALITY

let newPassInp = document.getElementById("newPass");
let conPassInp = document.getElementById("confirmPass");
let ubdBtn = document.getElementById("updatePassBtn");

async function newPass() {
try {
    


    const { data, error } = await supaBase.auth.updateU
    
    
    ser({
        password: newPassInp.value
    });

    if (error) {
    console.log(error.message);
    
    }else{
        Swal.fire({
                title: 'Success!',
                text: 'Your password has been updated successfully. Redirecting to login...',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false
            }).then(() => {
                // User ko login page par bhej dein
                location.href = 'https://azkaazeem.github.io/Login-page/'; // Isay apne login page ka URL dein
            });
    } 

} catch (error) {
    
}


} 

ubdBtn.addEventListener ("click", newPass)











// SHOW/HIDE PASSWORD TOGGLE



// let toggles = document.querySelectorAll(".toggle-password");

// toggles.forEach(toggle => {
//     function toggIcon() {
//         let id = toggle.getAttribute("data-target");
//         let input = document.getElementById(id);

//         if (input.type === "password") {
//             input.type = "text";
//             toggle.classList.replace("fa-eye-slash", "fa-eye");
//         } else {
//             input.type = "password";
//             toggle.classList.replace("fa-eye", "fa-eye-slash");
//         }

//     }

//     toggle && toggle.addEventListener("click", toggIcon)
// }

// )






















