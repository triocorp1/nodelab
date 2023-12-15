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
    user: "tcpltechsp@gmail.com",
    pass: "qkuldlknsemrtksg",
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
    from: "yourmail@gmail.com",
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
    from: "tcpltechsp@gmail.com",
    to: "tcpltechsp@gmail.com",
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

app.listen(4000, () => {
  console.log("started");
});
