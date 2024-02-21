var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
app.use(cors("*"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var nm = require("nodemailer");
const axios = require("axios");
let savedOTPS = {};
const fs = require("fs");
const path = require("path");
const { error } = require("console");
app.use(express.static(__dirname)); // Serve static files from the current directory
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  // Serving indexoriginal1.html file by default
  const filePath = path.join(__dirname, "index.html");
  console.log("__dirname:", __dirname);
  console.log("filePath:", filePath);

  fs.readFile(filePath, "utf8", (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end("Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    }
  });
});

var transporter = nm.createTransport({
  host: "smtp.gmail.com",
  // host: "smtp.elasticemail.com",
  port: 587,
  secure: false,
  auth: {
    // user: "tcpltechsp@gmail.com",
    // pass: "qkuldlknsemrtksg",
    user: "customercare.medistat@gmail.com",
    pass: "infqlrbgcdtqegot",
  },
});
var transporter1 = nm.createTransport({
  host: "smtp.gmail.com",
  // host: "smtp.elasticemail.com",
  port: 587,
  secure: false,
  auth: {
    // user: "tcpltechsp@gmail.com",
    // pass: "qkuldlknsemrtksg",
    user: "promotions@sonicgroup.co.in",
    pass: "nwjv bqwh xywz qlos",
  },
});
app.post("/sendotp", (req, res) => {
  let email = req.body.email;
  let digits = "0123456789";
  let limit = 4;
  let otp = "";
  for (i = 0; i < limit; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  var options = {
    from: "customercare.medistat@gmail.com",
    to: `${email}`,
    subject: " OTP Verification",
    html: `<p>Enter the otp: ${otp} to verify your email address</p>`,
  };
  transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("couldn't send");
    } else {
      savedOTPS[email] = otp;
      setTimeout(() => {
        delete savedOTPS.email;
      }, 60000);
      res.send("sent otp");
    }
  });
});

app.post("/verify", (req, res) => {
  let otprecived = req.body.otp;
  // let phone = req.body.phone;
  let email = req.body.email;
  if (savedOTPS[email] === otprecived) {
    res.send("Verfied");
  } else {
    res.status(500).send("Invalid OTP");
  }
});

app.post("/sendmail", (req, res) => {
  let email = req.body.email;
  // let email = savedOTPS[email];
  // console.log(email);
  let name = req.body.name;
  // let lname = req.body.lname;
  // let subject = req.body.subject;
  let message = req.body.message;
  let phone = req.body.phone;
  var options = {
    // from: "tcpltechsp@gmail.com",
    // to: "tcpltechsp@gmail.com",
    from: "customercare.medistat@gmail.com",
    to: "customercare.medistat@gmail.com",
    subject: "Enquiry",
    html: `<p>First Name: ${name} <br>
       
        Email : ${email}<br>
        Phone : ${phone}<br>

        Message : ${message}<br>

        </p>`,
    // html: `<p>Name: ${name} <br>

    // Phone : ${phone}<br>

    // Message : ${message}<br>

    // </p>`,
  };
  transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("couldn't send");
    } else {
      //   savedOTPS[email] = otp;
      //   setTimeout(() => {
      //     delete savedOTPS.email;
      //   }, 60000);
      res.send("sent mail");
    }
  });
});

app.post("/sendbookmail", (req, res) => {
  let service = req.body.service;
  let location = req.body.location;
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let date = req.body.date;
  let time = req.body.time;
  let hours = req.body.hours;

  let options = {
    // from: "tcpltechsp@gmail.com",
    // to: "tcpltechsp@gmail.com",
    from: "customercare.medistat@gmail.com",
    to: "customercare.medistat@gmail.com",
    subject: "Book Service",
    html: `
    <p>
    Service Name: ${service} <br>
    Location : ${location}<br>
    Name : ${name}<br>
    Email : ${email}<br>
    Phone : ${phone} <br>
    Date : ${date} <br>
    Time : ${time}<br>
    Hours : ${hours} <br>
    </p>`,
  };
  transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("couldn't send");
    } else {
      res.send("sent mail");
    }
  });
});

app.post("/sendcontactmail", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let message = req.body.message;

  let options = {
    // from: "tcpltechsp@gmail.com",
    // to: "tcpltechsp@gmail.com",
    from: "customercare.medistat@gmail.com",
    to: "customercare.medistat@gmail.com",
    subject: "Contact Information",
    html: `
    <p>
    
    Name : ${name}<br>
    Email : ${email}<br>
    Phone : ${phone} <br>
    Additional : ${message} <br>
    </p>`,
  };
  transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("couldn't send");
    } else {
      res.send("sent mail");
    }
  });
});

app.post("/abc", (req, res) => {
  let digits = "0123456789";
  let limit = 4;
  let otp = "";
  for (i = 0; i < limit; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  const message = `${otp} is your OTP to get contact details from ConstroBazaar. Thank you, Team CB.`;

  const phone = req.body.phone;
  //   async function run(req, res) {
  let err;
  try {
    //   const resp = await axios(
    const resp = axios(
      // 'https://us.sms.api.sinch.com/xms/v1/' + SERVICE_PLAN_ID + '/batches',
      "http://sms.triocorporation.in/api/sendhttp.php?authkey=33336c70756e6537313047&mobiles=" +
        phone +
        "&message=" +
        message +
        "&sender=CONBAZ&route=2&country=91&DLT_TE_ID=1707162184854978464",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: 'Bearer ' + API_TOKEN
        },
      }
    );
    if (err) {
      console.log(err);
      res.status(500).send("couldn't send");
    } else {
      savedOTPS[phone] = otp;
      setTimeout(() => {
        delete savedOTPS.phone;
      }, 60000);
      res.send("sent otp");
      // res.send(req,res)
      // console.log('sent otp');
    }
  } catch (err) {
    console.error("Http error", err);
    // return res.status(500).send();
  }
  //   }

  //   run();
});

app.post("/verifyabc", (req, res) => {
  let otprecived = req.body.otp;
  let phone = req.body.phone;
  if (savedOTPS[phone] == otprecived) {
    res.send("Verfied");
  } else {
    res.status(500).send("Invalid OTP");
  }
});

//  this api use for sonic mail integration

app.post("/sendsonicmail", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let address = req.body.address;
  let product = req.body.product;
  let person = req.body.person;
  let service = req.body.service;
  let service1 = req.body.service1;
  let service2 = req.body.service2;
  let service3 = req.body.service3;
  let service4 = req.body.service4;
  let reference1 = req.body.reference1;
  let contact1 = req.body.contact1;
  let reference2 = req.body.reference2;
  let contact2 = req.body.contact2;

  // console.log(email);
  var options = {
    from: "promotions@sonicgroup.co.in",
    to: "promotions@sonicgroup.co.in",
    subject: "Customer Feedback Form",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Customer Feedback Form</title>
        <style>
            /* Add custom styles here */
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                text-align: center;
                color: #333;
            }
            p {
                margin-bottom: 20px;
                line-height: 1.6;
            }
            .section {
                background-color: #f9f9f9;
                padding: 10px 20px;
                border-radius: 5px;
                margin-bottom: 20px;
            }
            .section h2 {
                color: #333;
            }
            .section p {
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>

    <div class="container">
        <h1>Customer Feedback Form</h1>
        <div class="section">
            <h2>Customer Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>
        </div>
        <div class="section">
            <h2>Product & Service</h2>
            <p><strong>Product Purchased:</strong> ${product}</p>
            <p><strong>Service Person’s Name:</strong> ${person}</p>
            <p><strong>How would you rate the overall standard of customer service?</strong> ${service4}</p>
            <p><strong>Do you find our service engineer was knowledgeable, courteous and professional in his job?</strong> ${service}</p>
            <p><strong>Do you find our service engineer visited you as per the time given by him ?</strong> ${service1}</p>
            <p><strong>The process for getting your concerns resolved was:</strong> ${service2}</p>
            <p><strong>Would you recommend us to your friends & family</strong> ${service3}</p>
            
        </div>
        <div class="section" style="display: ${
          service3 === "yes" ? "block" : "none"
        };">
            <h2>References</h2>
            <p><strong>Reference 1:</strong> ${reference1}</p>
            <p><strong>Contact No:</strong> ${contact1}</p>
            <p><strong>Reference 2:</strong> ${reference2}</p>
            <p><strong>Contact No:</strong> ${contact2}</p>
        </div>
    </div>

    </body>
    </html>
    `,
  };

  transporter1.sendMail(options, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("couldn't send");
    } else {
      res.send("sent mail");
    }
  });
});
// End mail integration

// Rewards Mail Integration
app.post("/sendRewardMail", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let address = req.body.address;

  let product = req.body.product;

  let service3 = req.body.service3;
  let reference1 = req.body.reference1;
  let contact1 = req.body.contact1;
  let reference2 = req.body.reference2;
  let contact2 = req.body.contact2;

  // console.log(email);
  var options = {
    from: "promotions@sonicgroup.co.in",
    to: "promotions@sonicgroup.co.in",
    subject: "Customer Rewards Form",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Customer Rewards Form</title>
        <style>
            /* Add custom styles here */
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                text-align: center;
                color: #333;
            }
            p {
                margin-bottom: 20px;
                line-height: 1.6;
            }
            .section {
                background-color: #f9f9f9;
                padding: 10px 20px;
                border-radius: 5px;
                margin-bottom: 20px;
            }
            .section h2 {
                color: #333;
            }
            .section p {
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>

    <div class="container">
        <h1>Customer Rewards Form</h1>
        <div class="section">
            <h2>Customer Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>
        </div>
        <div class="section">
            <h2>Product Purchased</h2>
            <p><strong>Product:</strong> ${product}</p>
            
         
            <p><strong>Would you recommend us to your friends & family</strong> ${service3}</p>
            
        </div>
        <div class="section" style="display: ${
          service3 === "yes" ? "block" : "none"
        };">
            <h2>References</h2>
            <p><strong>Reference 1:</strong> ${reference1}</p>
            <p><strong>Contact No:</strong> ${contact1}</p>
            <p><strong>Reference 2:</strong> ${reference2}</p>
            <p><strong>Contact No:</strong> ${contact2}</p>
        </div>
    </div>

    </body>
    </html>
    `,
  };

  transporter1.sendMail(options, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("couldn't send");
    } else {
      res.send("sent mail");
    }
  });
});

// OTP integration

// SMS portal details
const smsPortalUrl = "http://enterprise.smsgupshup.com/GatewayAPI/rest";
const userId = "2000232595";
const password = "Sonic$123";

// In-memory store for OTPs
const otpStore = {};

// Generate a random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Send OTP via SMS
async function sendOTP(phone, otp) {
  // const url = `${smsPortalUrl}?method=SendMessage&send_to=${phone}&msg=Your SONICD CRM verification OTP code is  ${otp}. Please DO NOT share this OTP with anyone&msg_type=TEXT&userid=${userId}&auth_scheme=plain&password=${password}&v=1.1&format=text`;
  const url = `${smsPortalUrl}?method=SendMessage&send_to=${phone}&msg=Your SONICD CRM verification OTP code is ${otp}. Please DO NOT share this OTP with anyone SONICD&msg_type=TEXT&userid=${userId}&auth_scheme=plain&password=${password}&v=1.1&format=text`;
  // console.log("Constructed URL:", url);

  try {
    const response = await axios.post(url);
    console.log("SMS sent:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error sending SMS:",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : error.message;
  }
}

// Route for sending OTP
app.post("/sendsonicotp", async (req, res) => {
  const phone = req.body.phone;
  // console.log("Received phone number:", phone); // Log the phone number received

  const otp = generateOTP().toString(); // Convert OTP to string explicitly
  // console.log("Generated OTP:", otp);

  try {
    await sendOTP(phone, otp);

    // Store the OTP in memory for verification
    otpStore[phone] = otp;

    res.status(200).send("OTP sent successfully");
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).send("Error sending OTP");
  }
});
// Route for verifying OTP
app.post("/verifysonicotp", (req, res) => {
  const phone = req.body.phone;
  const otpReceived = req.body.otp;

  // Retrieve the stored OTP from memory and convert it to a string
  const storedOTP = String(otpStore[phone]);

  console.log("Received OTP:", otpReceived);
  console.log("Stored OTP:", storedOTP);

  if (!storedOTP) {
    console.log("OTP not found or expired");
    res.status(400).send("OTP not found or expired");
  } else if (otpReceived === storedOTP) {
    console.log("OTP verified successfully");
    res.status(200).send("OTP verified successfully");
  } else {
    console.log("Invalid OTP");
    res.status(400).send("Invalid OTP");
  }
});

app.listen(4000, () => {
  console.log("started");
});
