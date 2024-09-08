import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname manually for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to trigger the R script
const runRScript = () => {
  try {
    const rscriptPath = "C:\\Program Files\\R\\R-4.4.1\\bin\\Rscript.exe"; // Path to Rscript
    const scriptPath = path.resolve(__dirname, "../RScript/range.R"); // Path to your R script

    const rProcess = spawn(rscriptPath, [scriptPath]);

    // Capture stdout from the R script
    rProcess.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    // Capture stderr from the R script
    rProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    // Handle when the process closes
    rProcess.on("close", (code) => {
      console.log(`R script exited with code ${code}`);
    });
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
  }
};

// Export the function so it can be used in other modules
export default runRScript;
