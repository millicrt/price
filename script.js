// GET HTML ELEMENTS

const copyButton = document.getElementById("copyButton");

const accountNumber = document.getElementById("accountNumber");

const toast = document.getElementById("toast");

let toastTimer;


// SHOW NOTIFICATION

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


// COPY ACCOUNT NUMBER

async function copyAccountNumber() {

    const number = accountNumber.textContent.trim();

    try {

        // MODERN CLIPBOARD METHOD

        if (navigator.clipboard && window.isSecureContext) {

            await navigator.clipboard.writeText(number);

        } else {

            // FALLBACK COPY METHOD

            const temporaryInput = document.createElement("textarea");

            temporaryInput.value = number;

            temporaryInput.setAttribute("readonly", "");

            temporaryInput.style.position = "absolute";

            temporaryInput.style.left = "-9999px";

            document.body.appendChild(temporaryInput);

            temporaryInput.select();

            const copied = document.execCommand("copy");

            temporaryInput.remove();

            if (!copied) {

                throw new Error("Copy failed");

            }

        }


        // SUCCESS MESSAGE

        showToast("Account number copied!");

        copyButton.querySelector("span").textContent = "Copied";

        setTimeout(() => {

            copyButton.querySelector("span").textContent = "Copy";

        }, 1800);


    } catch (error) {

        showToast("Copy failed — please copy 8229025638 manually.");

    }

}


// BUTTON CLICK EVENT

copyButton.addEventListener("click", copyAccountNumber);