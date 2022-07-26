
const input = document.getElementById('img')
const output = document.getElementById('output')

document.getElementById('sharex').addEventListener('click', async () => {
  // ***Here is the code for converting "image source" (url) to "Base64".***

  let url = input.src
  const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
        }))
  
  
  // ***Here is code for converting "Base64" to javascript "File Object".***
  
    function dataURLtoFile(dataurl, filename) {
       var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
       bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
       while(n--){
       u8arr[n] = bstr.charCodeAt(n);
       }
     return new File([u8arr], filename, );
    }
  
  
  // *** Calling both function ***
  
    toDataURL(url)
    .then(dataUrl => {
       console.log('Here is Base64 Url', dataUrl)
       const files = dataURLtoFile(dataUrl, "imageName.jpg");
       console.log("Here is JavaScript File Object",files)
     })
  console.log(input);
  console.log(files);


  // feature detecting navigator.canShare() also implies
  // the same for the navigator.share()
  if (!navigator.canShare) {
    output.textContent = `Your browser doesn't support the Web Share API.`
    return
  }

  if (navigator.canShare({ files })) {
    try {
      await navigator.share({
        files,
        title: 'Images',
        text: 'Beautiful images'
      })
      output.textContent = 'Shared!'
    } catch (error) {
      output.textContent = `Error: ${error.message}`
    }
  } else {
    output.textContent = `Your system doesn't support sharing these files.`
  }
})