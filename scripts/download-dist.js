const fs = require("fs-extra");
const archiver = require("archiver");

// Create a file to stream archive data to.
const output = fs.createWriteStream("dist.zip");
const archive = archiver("zip", {
  zlib: { level: 9 }, // Sets the compression level.
});

// Listen for all archive data to be written
output.on("close", function () {
  console.log(archive.pointer() + " total bytes");
  console.log(
    "Archive has been finalized and the output file descriptor has closed.",
  );
});

// Catch warnings during archiving
archive.on("warning", function (err) {
  if (err.code === "ENOENT") {
    console.warn(err);
  } else {
    throw err;
  }
});

// Catch errors
archive.on("error", function (err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Append the dist directory contents
archive.directory("dist/", false);

// Finalize the archive
archive.finalize();
