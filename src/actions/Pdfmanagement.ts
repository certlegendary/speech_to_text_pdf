import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib'
import { request, PERMISSIONS } from 'react-native-permissions'
type PDFData = {
  hospital: string,
  name: string,
  gender: string,
  address: string,
  vitals: string,
  complaint: string,
  diagnosis: string,
  medications: string,
}
export const generatePDF = async (data: PDFData) => {
  try {
    const granted = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (granted === 'denied') {
      console.error('Permission to write to external storage denied');
      return;
    }

    const page = PDFPage
      .create()
      .setMediaBox(200, 200)
      .drawText(`${data.hospital}`, {
        fontSize: 20,
        color: 'cyan',
        x: 50,
        y: 30,
      })
      .drawRectangle({
        x:20,
        y: 60,
        width: 160,
        height: 2,
        color: 'cyan',
      })
      .drawText("Name", {
        x: 40,
        y: 100,
        fontSize: 14,
      })
      .drawText(data.name)
      
      .drawText("Gender", {
        x: 40,
        y: 120,
        fontSize: 14,
      })
      .drawText(data.gender)
      
      .drawText("Address", {
        x: 40,
        y: 140,
        fontSize: 14,
      })
      .drawText(data.address)

      const docsDir = await PDFLib.getDocumentsDirectory();
      const pdfPath = `${docsDir}/prescription.pdf`;
      PDFDocument
        .create(pdfPath)
        .addPages([page])
        .write()
        .then(path => {
          console.log('PDF created at ' + path)
        })
      
  } catch (err) {
    console.log(err)
  }
}