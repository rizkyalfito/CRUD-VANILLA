let selectedRow = null;

function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");

    // Debugging logs
    console.log("Inserting alert into the DOM");
    console.log("Container:", container);
    console.log("Main:", main);

    if (main) {
        container.insertBefore(div, main);
    } else {
        container.appendChild(div);
    }

    // Debugging log
    console.log("Alert inserted");

    setTimeout(() => {
        const alert = document.querySelector(".alert");
        if (alert) {
            alert.remove();
            console.log("Alert removed");
        }
    }, 3000);
}

//tambah Data

function tambahData(){
    document.querySelector("#student").addEventListener("submit", (e) =>{
        e.preventDefault();

        //mengambil value input
        const namaDepan = document.querySelector("#namaDepan").value;
        const namaBelakang = document.querySelector("#namaBelakang").value;
        const NPM = document.querySelector("#NPM").value;

        //proses validasi

        if(namaDepan == "" || namaBelakang == ""){
            showAlert("Pastikan semua field sudah ter isi!","warning")
        }else{
            if(selectedRow == null){
                const list = document.querySelector("#list-mahasiswa");
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${namaDepan}</td>
                    <td>${namaBelakang}</td>
                    <td>${NPM}</td>
                    <td><a href="#" class="btn btn-warning btn-sm mb-1 edit">Edit</a>
                            <a href="#" class="btn btn-danger btn-sm hapus">Hapus</a>
                    </td>
                    
                `;
                list.appendChild(row);
                selectedRow = null;
                showAlert("Data Mahasiswa berhasil ditambahkan!","success")
            }else{
                selectedRow.children[0].textContent = namaDepan;
                selectedRow.children[1].textContent = namaBelakang;
                selectedRow.children[2].textContent = NPM;
                selectedRow = null;
                showAlert("Data mahasiswa berhasil diedit","info")
            }
            clearField();
        }
    })
}
document.addEventListener("DOMContentLoaded", tambahData);

//edit data mahassiswa

document.querySelector("#list-mahasiswa").addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("edit")) {
        // Mengatur selectedRow ke baris yang sesuai yang ingin diedit
        selectedRow = target.parentElement.parentElement;
        if (selectedRow) {
            document.querySelector("#namaDepan").value = selectedRow.children[0].textContent;
            document.querySelector("#namaBelakang").value = selectedRow.children[1].textContent;
            document.querySelector("#NPM").value = selectedRow.children[2].textContent;
        } else {
            console.error("Selected row is not defined.");
        }
    }
});



//membersihkan field input

function clearField(){
    document.querySelector("#namaDepan").value="";
    document.querySelector("#namaBelakang").value="";
    document.querySelector("#NPM").value="";
}

//hapus
document.querySelector("#list-mahasiswa").addEventListener("click", (e) => {
    e.preventDefault();  // Prevent default action for <a> tags
    const target = e.target;
    if (target.classList.contains("hapus")) {
        target.parentElement.parentElement.remove();
        showAlert("Mahasiswa berhasil dihapus!", "danger");
    }
});
