const D = document;
const body = D.body;
const mainSection = D.querySelector(".main");
const uploadRaButton = D.querySelector(".upload-ra-button");

const uploadListButton = D.querySelector(".upload-list-button");
const raInput = D.querySelector(".ra-input");
const traineeList = D.querySelector('textarea');

const missingButton = D.querySelector(".missing-button");

missingButton.addEventListener("click", (e) =>
	{
		if (e.target.dataset.url)
			window.open(e.target.dataset.url, "_blank")
	})

const sendRaCodeToServer = async (input) =>
{
    console.log ("data to send:", input.value);
    const dataToSend = {
        raCode: input.value
    };
    try 
    {
        const response = await fetch("./data/ra-code.php",
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
            input.value = "";
            console.log("RA Code sent!");
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

}

uploadRaButton.addEventListener("click", (e) =>
{
	pageLink = e.target.dataset.url + raInput.value;
	window.open(pageLink, "_blank");
	sendRaCodeToServer(raInput);
})

uploadListButton.addEventListener("click", async (e) =>
{
    console.log ("data to send:", traineeList.value);
    const dataToSend = {
        participantList: traineeList.value
    };

    try 
    {
        const response = await fetch("./data/participant-list.php",
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
		console.log("Success:")	;
		console.log("File:", result.file);
		console.log("python cmd:", result.python_command);
		console.log("python output:", result.python_output);
		traineeList.value = "";
		alert("Participant list sent!");
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
