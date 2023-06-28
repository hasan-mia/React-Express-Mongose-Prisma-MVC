const mysql = require("mysql");

const mySqlConnect = async () => {
	const con = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
	});

	con.connect(function (err) {
		if (err) throw err;
		console.log("MySQL is Connected!");
	});
};

module.exports = mySqlConnect;
