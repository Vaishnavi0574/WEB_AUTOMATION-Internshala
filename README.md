# Internshala-Automation
<h3>Script Overview</h3>
  <h4>Login:</h4>

The script logs into Internshala using credentials (email and password) that are stored in a secret.js file. It simulates typing the email and password into the login form and clicking the login button.
Navigating the Profile:

After logging in, the script navigates to the user profile and retrieves the URLs for various profile options (like education, training, work samples).
Filling Out Profile Information:

It then fills out various sections of the profile:
Graduation Details: It inputs details about the user's college, degree, performance, etc.
Training/Experience: Adds training or experience details.
Work Samples: It inputs work sample links (e.g., LeetCode profile).
These details are extracted from a data.js file, which contains an array of data objects (like "College", "Degree", "Training", etc.).
Downloading Resume (Optional):

The script also includes an option to download the resume by clicking the appropriate button on the profile page.
Applying for Internships:

The script goes to the Internshala Summer Internship Fair page and grabs the URLs of internship listings.
It loops through the internship listings, visiting each one and clicking the "Apply" button to submit applications.
Main Functions Breakdown:
<bold>randomDelay(min, max): A helper function to introduce random delays between actions, mimicking human behavior.

graduation(data): This function fills in the graduation-related fields on the profile page.

training(data): This function fills out training-related information on the profile.

workSample(data): Adds a work sample, like a link to a coding profile (e.g., LeetCode).

application(data): This function visits the Summer Internship Fair page, retrieves internship links, and applies to them sequentially.

apply(url, data): This function applies to an individual internship by navigating to its page and clicking the "Apply" button.

Notes on How It Works:
Data Files: The data.js file stores the details that will be used to fill out the profile. You need to have data like college name, degree, training details, and work samples in this file.

Random Delays: The script introduces random delays between actions (randomDelay(min, max)) to make the automation more human-like and prevent detection by anti-bot mechanisms.

Page Navigation: The script uses tab.goto() to navigate between pages, tab.click() to click on elements, and tab.type() to type into input fields.

Error Handling: There’s basic error handling like waiting for certain elements to load (await tab.waitForSelector()) before performing actions.
