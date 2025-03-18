const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const sortSelect = document.getElementById("sortSelect");
const tbl = document.getElementById("tblNumbers");

let numbersArr = [];

function insertNumber() {
    const txtNumber = document.getElementById("txtNum").value;
    let regex = /^[0-9]+$/;

    if (txtNumber.match(regex)) {
        let num = parseInt(txtNumber);
        numbersArr.push(num);
        document.getElementById("txtNum").value = "";
        updateTable();
    } else {
        alert("Please input a positive number.");
        document.getElementById("txtNum").value = "";
    }
}

btn1.addEventListener("click", insertNumber);

document.getElementById("txtNum").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        insertNumber();
    }
});

btn2.addEventListener("click", () => {
    document.getElementById("txtNum").value = "";
});

btn3.addEventListener("click", () => {
    numbersArr = [];
    tbl.innerHTML = "";
    document.getElementById("extraRowsHL")?.remove();
    document.getElementById("extraRowsTotal")?.remove();
});

function deleteNumber(i) {
    numbersArr.splice(i, 1);
    updateTable();
}

function editNumber(i) {
    const newNumber = prompt("Enter new number:", numbersArr[i]);
    let regex = /^[0-9]+$/;

    if (newNumber !== null && newNumber.match(regex)) {
        numbersArr[i] = parseInt(newNumber);
        updateTable();
    } else {
        alert("Invalid number input.");
    }
}

function updateTable() {
    tbl.innerHTML = "";

    if (numbersArr.length > 0) {
        let sortedArr = [...numbersArr];

        if (sortSelect.value === "asc") {
            sortedArr.sort((a, b) => a - b);
        } else if (sortSelect.value === "desc") {
            sortedArr.sort((a, b) => b - a);
        }

        sortedArr.forEach((num, i) => {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const btnDelete = document.createElement("button");
            const btnEdit = document.createElement("button");

            td1.style.width = "70px";
            td1.innerHTML = num;

            td2.style.width = "70px";
            td2.style.color = num % 2 === 0 ? "green" : "blue";
            td2.innerHTML = num % 2 === 0 ? "EVEN" : "ODD";

            btnDelete.textContent = "Remove";
            btnDelete.onclick = () => deleteNumber(i);

            btnEdit.textContent = "Edit";
            btnEdit.onclick = () => editNumber(i);

            td3.appendChild(btnDelete);
            td4.appendChild(btnEdit);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tbl.appendChild(tr);
        });

        
        addExtraRows();
    }
}


function addExtraRows() {
    document.getElementById("extraRowsHL")?.remove();
    document.getElementById("extraRowsTotal")?.remove();

    const extraRowsHL = document.createElement("tbody");
    extraRowsHL.id = "extraRowsHL";
    extraRowsHL.style.display = "none";

    const extraRowsTotal = document.createElement("tbody");
    extraRowsTotal.id = "extraRowsTotal";
    extraRowsTotal.style.display = "none";

    const highestRow = document.createElement("tr");
    const highestLabel = document.createElement("td");
    highestLabel.innerHTML = "<b>Highest:</b>";
    const highestValue = document.createElement("td");
    highestValue.id = "highest";
    highestRow.appendChild(highestLabel);
    highestRow.appendChild(highestValue);

    const lowestRow = document.createElement("tr");
    const lowestLabel = document.createElement("td");
    lowestLabel.innerHTML = "<b>Lowest:</b>";
    const lowestValue = document.createElement("td");
    lowestValue.id = "lowest";
    lowestRow.appendChild(lowestLabel);
    lowestRow.appendChild(lowestValue);

    const totalRow = document.createElement("tr");
    const totalLabel = document.createElement("td");
    totalLabel.innerHTML = "<b>Total:</b>";
    const totalValue = document.createElement("td");
    totalValue.id = "total";
    totalRow.appendChild(totalLabel);
    totalRow.appendChild(totalValue);

    extraRowsHL.appendChild(highestRow);
    extraRowsHL.appendChild(lowestRow);

    extraRowsTotal.appendChild(totalRow);

    tbl.appendChild(extraRowsHL);
    tbl.appendChild(extraRowsTotal);
}


btn5.addEventListener("click", () => {
    if (numbersArr.length > 0) {
        document.getElementById("highest").innerHTML = Math.max(...numbersArr);
        document.getElementById("lowest").innerHTML = Math.min(...numbersArr);
        
        document.getElementById("extraRowsHL").style.display = "table-row-group";
        document.getElementById("extraRowsTotal").style.display = "none";
    } else {
        alert("No numbers inserted yet.");
    }
});


btn4.addEventListener("click", () => {
    if (numbersArr.length > 0) {
        const total = numbersArr.reduce((sum, num) => sum + num, 0);
        document.getElementById("total").innerHTML = total;

        document.getElementById("extraRowsTotal").style.display = "table-row-group";
        document.getElementById("extraRowsHL").style.display = "none";
    } else {
        alert("No numbers inserted yet.");
    }
});

sortSelect.addEventListener("change", updateTable);