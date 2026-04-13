const D = document;
const body = D.body;
const buttonList = D.querySelector("#button-list");
const mainSection = D.querySelector(".main");

const form = D.querySelector("form");
const textArea = D.querySelector("textarea");
const formSubmitButton = D.querySelector(".form-submit-button");

formSubmitButton.addEventListener("click", async (e) =>
{
    e.preventDefault();
    console.log ("data to send:", textArea.value);
    const dataToSend = {
        feedback: textArea.value
    };

    try 
    {
        const response = await fetch("./data/data.php",
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
    });

    if (response.ok)
        {
            const result = await response.json();
            console.log("Success:", result);
            textArea.value = "";
            alert("Feedback sent!");
        }
        else
        {
            console.error("Server error:", response.status);
        }
    }
    catch (error)
    {
        console.error("Network error:", error);
    }
});

buttonList.addEventListener("click", (e) =>
{
    if (e.target.tagName === "BUTTON" && e.target.dataset.url)
    {
        window.open(e.target.dataset.url, "_blank");
    }
})
    


