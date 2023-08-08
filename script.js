document.addEventListener("DOMContentLoaded", function() {
    let dropZone = document.getElementById('dropZone');
    let fileInput = document.getElementById('fileInput');
    let preview = document.getElementById('preview');
    let actions = document.getElementById('actions');
    let deleteButton = document.getElementById('deleteButton');

    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.backgroundColor = "#e6e6e6";
    });

    dropZone.addEventListener('dragleave', function(e) {
        this.style.backgroundColor = "";
    });

    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.backgroundColor = "";
        let files = e.dataTransfer.files;
        displayImage(files);
    });

    fileInput.addEventListener('change', function() {
        let files = this.files;
        displayImage(files);
    });

    deleteButton.addEventListener('click', function(e) {
        e.preventDefault();
        while (preview.firstChild) {
            preview.removeChild(preview.firstChild);
        }
        actions.style.display = "none";
        dropZone.style.display = "block";
    });

    function displayImage(files) {
        if (files.length > 0) {
            let file = files[0];
            let imageType = /^image\//;

            if (!imageType.test(file.type)) {
                alert("Please select an image.");
                return;
            }

            let img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.onload = function() {
                URL.revokeObjectURL(this.src);
            }
            
            dropZone.style.display = "none";
            preview.appendChild(img);
            actions.style.display = "block";
        }
    }
});
