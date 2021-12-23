const userName = document.getElementById("nombre");
const submitBtn = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib;

let pdfFile = document.querySelector("#pdfFile");

pdfFile.addEventListener("change", async () => {
  try {
    let fileToBeSent = pdfFile.files[0];
    let formData = new FormData();
    await formData.append("pdfFile", fileToBeSent);
    $.ajax({
      url: '/uploadFile',
      type: 'post',
      enctype: 'multipart/form-data',
      data: formData,
      contentType: false,
      processData: false,
      success: function (response) {
        if (response != 0) {
          console.log(response);
        } else {
          console.log(response);
        }
      },
    });
  } catch (error) {
    console.log(error)
  }
})


submitBtn.addEventListener("click", () => {
  let val = userName.value;
  val = val.split(",");
  val.forEach((uname)=>{
    let newUsername = uname.trim();
    console.log(newUsername)
    generatePDF(newUsername);
  })
  // if (userName.checkValidity()) {
  //   // console.log(val);
  //   generatePDF(val);
  // } else {
  //   userName.reportValidity();
  // }
});
const generatePDF = async (nombre) => {
  const existingPdfBytes = await fetch("../assets/certificado.pdf").then((res) =>
    res.arrayBuffer()
  );


  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);



  const fontBytes = await fetch("../assets/Sanchez-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );

  const SanChezFont = await pdfDoc.embedFont(fontBytes);

  
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const textSize = 58;
  const textWidth = SanChezFont.widthOfTextAtSize(nombre, textSize);


  firstPage.drawText(nombre, {
    x: firstPage.getWidth() / 2 - textWidth / 2,
    y: 450,
    size: textSize,
    font: SanChezFont,
    color: rgb(0.59, 0.48, 0.71),
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  saveAs(pdfDataUri, "certificadoprakash.pdf")
};

