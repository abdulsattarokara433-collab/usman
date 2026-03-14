// LocalStorage key definition
const STORAGE_KEY = 'lasani_permanent_data';

window.onload = function() {
    displayData();
};

function saveData() {
    let name = document.getElementById('custName').value.trim();
    let phone = document.getElementById('custPhone').value.trim();
    let amount = document.getElementById('custAmount').value;
    let type = document.getElementById('entryType').value;
    let editIndex = document.getElementById('editIndex').value;

    if(!name || !amount) {
        alert("Naam aur Amount lazmi hain!");
        return;
    }

    // Get data from Local Disk (LocalStorage)
    let records = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const newRecord = { name, phone, amount, type };

    if(editIndex === "") {
        records.push(newRecord);
    } else {
        records[editIndex] = newRecord;
        document.getElementById('editIndex').value = "";
        document.getElementById('saveBtn').innerText = "DATA SAVE KAREIN";
    }

    // Permanent Save to Disk
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    
    alert("Data Parmanent Mehfooz Kar Liya Gaya Hai!");
    clearInputs();
    displayData();
}

function displayData() {
    let records = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    let list = document.getElementById('customerList');
    list.innerHTML = "";

    records.forEach((r, i) => {
        let color = r.type === 'lena' ? '#f85149' : '#3fb950';
        list.innerHTML += `
            <tr>
                <td><b>${r.name}</b><br><small style="color:#8b949e">${r.phone}</small></td>
                <td style="color:${color}; font-weight:bold">Rs. ${r.amount}</td>
                <td style="color:${color}; font-size:12px">${r.type === 'lena' ? 'Lene Hain' : 'Dene Hain'}</td>
                <td>
                    <button class="btn-edit ripple" onclick="editRecord(${i})"><i class="fas fa-pencil-alt"></i></button>
                    <button class="btn-del ripple" onclick="deleteRecord(${i})"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>
        `;
    });
}

function deleteRecord(i) {
    if(confirm("Mita dein? Ye parmanent delete ho jayega.")) {
        let records = JSON.parse(localStorage.getItem(STORAGE_KEY));
        records.splice(i, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
        displayData();
    }
}

function editRecord(i) {
    let records = JSON.parse(localStorage.getItem(STORAGE_KEY));
    let r = records[i];

    document.getElementById('custName').value = r.name;
    document.getElementById('custPhone').value = r.phone;
    document.getElementById('custAmount').value = r.amount;
    document.getElementById('entryType').value = r.type;
    document.getElementById('editIndex').value = i;
    
    document.getElementById('saveBtn').innerText = "UPDATE RECORD";
    window.scrollTo(0, 200);
}

function searchCustomer() {
    let filter = document.getElementById('searchBar').value.toLowerCase();
    let rows = document.getElementById('customerList').getElementsByTagName('tr');
    for (let row of rows) {
        row.style.display = row.innerText.toLowerCase().includes(filter) ? "" : "none";
    }
}

function clearInputs() {
    document.getElementById('custName').value = "";
    document.getElementById('custPhone').value = "";
    document.getElementById('custAmount').value = "";
}
function searchCustomer() {
    let searchInput = document.getElementById('searchBar');
    let searchBox = searchInput.parentElement; // Search ka main div
    let filter = searchInput.value.toLowerCase();
    let rows = document.getElementById('customerList').getElementsByTagName('tr');
    
    // Border Color Change Logic
    if (filter.length > 0) {
        searchBox.classList.add('search-active');
    } else {
        searchBox.classList.remove('search-active');
    }

    // Search Filtering
    for (let row of rows) {
        let nameElement = row.getElementsByTagName('td')[0].getElementsByTagName('b')[0];
        let name = nameElement.innerText.toLowerCase();
        
        // Agar naam search alphabet se shuru hota hai to dikhaye
        if (name.startsWith(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}