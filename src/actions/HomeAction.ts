import axios from 'axios';
import { Alert} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { request, PERMISSIONS } from 'react-native-permissions';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import letterHeadJson from '../assets/images/letterhead.json'
type PDFData = {
  hospital: string,
  name: string,
  gender: string,
  address: string,
  vitals: string,
  complaint: string,
  diagnosis: string,
  medications: string,
  followUp: string,
  advice: string,
  date: string,
}
const backgroundImage = `url(${letterHeadJson.data})`
export const generatePDF = async (data: PDFData) => {
  try {
    const granted = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (granted === 'denied') {
      console.error('Permission to write to external storage denied');
      return;
    }
    let vitals = data.vitals.replace(/\n/g, '<br>');
    let complaint = data.complaint.replace(/\n/g, '<br>');
    let medications = data.medications.replace(/\n/g, '<br>');
    let diagnosis = data.diagnosis.replace(/\n/g, '<br>');
    let advice = data.advice.replace(/\n/g, '<br>')
    let followUp = data.followUp.replace(/\n/g, '<br>')
    const html = `
    <Html>
<head>
  <style>
    body {
      background-image: ${backgroundImage};
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
    }

    area {
      border: 1px solid red;
      color: blue;
      title: "dfdf"
        background:red;

    }

    .header {
      margin-top: 100px;
      text-align: center;
      font-size: 12px;
      margin-left: 80px;
      line-height: 2px;
    }

    .text-blue {
      color: blue;
    }

    .footer {
      color: black;
      text-align: center;
      border-top: 2px solid black;
      margin: 20px
    }

    body {
      font-size: 16px;
    }

    .container {

      padding: 25px 60px;
    }

    .d-flex {
      display: flex
    }

    .justify-content-between {
      justify-content: space-between;
    }

    .detail {
      margin-top: 10px;
      border-top: 2px solid grey;
      padding-top: 10px;
    }
    .content {
      padding: 20px;
    }

    .gap{
      gap: 30px;
    }
  </style>
</head>
<body>

  <head>
    <style>

    </style>
  </head>
  <div class="header">
    <p class="text-blue"><strong> Tel: 011-45517427m 97588825786,3258254552 </strong></p>
    <p class=""><strong> C-1 /65, New Ashok Nagar, Near Malda Market, Delhi-110096</strong></p>
  </div>
  <br>
  <br>
  <div class="container">
    <div class="d-flex justify-content-between">
      <div>
        Address : ${data.address} <br>
        Gender : ${data.gender} <br>
        Phone : xxx-xxx-xxxx
      </div>
      <div>
        PH: (xxx) xxx xxxx xxxx <br>
        FAX: (xxx) xxx xxx xxxx
      </div>
    </div>
    <div class="detail">
      <div>
        Date: ${data.date}
      </div>
      <br>
      <div class="d-flex gap">
        <p style='width: 75px'> <strong>Vitals: </strong><p>
        <div>
          <p>${vitals} </p>
        </div>
      </div>
      <div class="d-flex gap">
        <p style='width: 75px'> <strong>Complaint </strong><p>
        <div>
          <p> ${complaint}</p>
        </div>
      </div>
      <div class="d-flex gap">
        <p style='width: 75px'> <strong>Diagnosis </strong><p>
        <div>
          <p>${diagnosis} </p>
        </div>
      </div>
      <div class="d-flex gap" style="min-height: 100px;">
        <p style='width: 75px'> <strong>Medications </strong><p>
        <div>
          <p> ${medications} </p>
        </div>
      </div>
      <div class="d-flex gap" style="min-height: 50px;">
        <p style='width: 75px'> <strong>Advice </strong><p>
        <div>
          <p> ${advice} </p>
        </div>
      </div>
      <div class="d-flex gap" style="min-height: 50px;">
        <p> <strong>Follow Up </strong><p>
        <div>
          <p style='width: 75px'> ${followUp} </p>
        </div>
      </div>

    </div>
  </div>
</body>

</Html>`
const file = await RNHTMLtoPDF.convert({
  html,
  fileName: 'prescripotion',
      directory: '/',
      base64: true,
    });
    let filepath = RNFS.DownloadDirectoryPath + '/prescription.pdf';
    await RNFS.writeFile(filepath, file.base64!, 'base64')

    Alert.alert("Output", "Your prescription stored in Download/prescription.pdf")

    const pdfFilePath = filepath;

    const option = {
      url: pdfFilePath,
      type: 'application/pdf',
      social: Share.Social.WHATSAPP,
      appId: ""
    }
    await Share.shareSingle(option);

  } catch (err) {
    console.log(err)
  }
}

export const uploadAudio = async (audioFilePath: string) => {
  console.log(audioFilePath, 'audio file path')
  if (!audioFilePath || ! (await RNFS.exists(audioFilePath))) {
    return;
  }
  try {

    const data = new FormData();
    data.append('language', 'english')
    data.append('model_size', 'tiny')

    data.append('audio_data', {
      name: 'sound.mp4',
      type: 'audio/mp4',
      uri: audioFilePath,
    });
    
    const response = await axios.post('http://3.22.118.88/transcribe', data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      }
    })

    return response.data;
    
  } catch (error) {
    Alert.alert('Error', error.toString())
    return 'Not match'
  }

}