function convertToWebP() {
    const input = document.getElementById('folderInput');
    const files = input.files;
    const preview = document.getElementById('preview');
    preview.innerHTML = '';

    if (!files.length) {
      alert('Por favor, selecciona una carpeta primero.');
      return;
    }

    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function () {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          // Exportamos a WebP
          canvas.toBlob(function (blob) {
            const webpURL = URL.createObjectURL(blob);

            const downloadLink = document.createElement('a');
            downloadLink.href = webpURL;
            downloadLink.download = file.name.replace(/\.[^/.]+$/, "") + ".webp";

            const previewImg = document.createElement('img');
            previewImg.src = webpURL;
            preview.appendChild(previewImg);

            previewImg.onclick = () => {
              downloadLink.click();
            };
          }, 'image/webp');
        };
      };
      reader.readAsDataURL(file);
    });
  }
