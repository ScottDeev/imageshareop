
const input = document.getElementById('img')
const output = document.getElementById('output')

document.getElementById('sharex').addEventListener('click', async () => {
  // ***Here is the code for converting "image source" (url) to "Base64".***
  let url = input.src
  console.log(url);
  const getUrlExtension = (url) => {
    return url
      .split(/[#?]/)[0]
      .split(".")
      .pop()
      .trim();
  }

  const onImageEdit = async (imgUrl) => {
     const imgExt = getUrlExtension(imgUrl);
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const file = new File([blob], "profileImage." + imgExt, {
      type: blob.type,
    });
    console.log(file);
    if (navigator.canShare(file )) {
      try {
         navigator.share({
          file,
        })
        output.textContent = 'Shared!'
      } catch (error) {
        output.textContent = `Error: ${error.message}`
      }
    } else {
      output.textContent = `Your system doesn't support sharing these files.`
    }
  }
  onImageEdit(url)
})
  // console.log(input);
  
  
  // feature detecting navigator.canShare() also implies
  // the same for the navigator.share()