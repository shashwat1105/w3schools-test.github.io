const FTPSrv = require('ftp-srv');

// Create a new FTP server on port 21
const ftpServer = new FTPSrv("ftp://0.0.0.0:21", {
  anonymous: false,   // Disable anonymous login
  greeting: "Welcome to the FTP server!"
});

// Handle login event
ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
  // Set the credentials to allow login
  if (username === "user" && password === "pass") {
    resolve({ root: "./uploads" }); // Set the directory for file uploads
  } else {
    reject(new Error("Invalid credentials"));  // Reject login on invalid credentials
  }
});

// Start the FTP server
ftpServer.listen().then(() => console.log("FTP Server running on port 21"));
