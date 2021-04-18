const nodemailer = require("nodemailer");
const fs = require("fs");
// const temp_recieverEmail = "testing10200201@outlook.com";

async function gmailsend(recieverEmail) {
	let data = await fs.promises.readFile("./auth_details.json", "utf-8");
	let credentials = JSON.parse(data);
	// console.log(credentials);

	email = credentials.email;
	password = credentials.password;

	let transport = nodemailer.createTransport({
		service: "hotmail",
		auth: {
			user: email,
			pass: password,
		},
	});
	let message = {
		from: email,
		to: recieverEmail,
		subject: "reg: Hospital Details",
		text: "Hospital details PDF is attached in this mail.",
		attachments: [
			{
				filename: "hospital_details.pdf",
				path: `./hospital_details.pdf`,
			},
		],
	};
	transport.sendMail(message, function (err) {
		if (err) {
			console.log("Failed to send email.\n" + err.message);
			return;
		}
		console.log(`Email sent to ${recieverEmail} \ncheck your email.`);
	});
}

module.exports = {
	gmailsendFn: gmailsend,
};
