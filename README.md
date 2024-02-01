# Online-Resume-Builder
This is a web-based professional resume builder designed to help users create polished resumes with ease. The application allows users to input their personal information, education details, achievements, and certifications through a user-friendly form. Users can also upload an image to include in their resumes.

## Features

- **Dynamic Form Fields:** Users can dynamically add education, achievements, and certifications fields to customize their resumes.
  
- **Profanity Filter:** The application includes a profanity filter for the "About" section to ensure professional and appropriate content.

- **Resume Preview:** Users can preview their resumes before finalizing them. The preview includes a professional layout with user-provided information.

- **PDF Download:** The application provides the functionality to convert the resume preview into a downloadable PDF, making it easy for users to share or print their resumes.

## Usage

1. Fill in the required personal information, including name, email, and optional social media profiles (LinkedIn, LeetCode, GitHub).
  
2. Add educational background, achievements, and certifications dynamically using the respective "Add" buttons.

3. Write a brief "About" section (50 words max) and upload a professional image.

4. Click the "Preview Resume" button to see a live preview of the resume.

5. Optionally, download the resume as a PDF for offline use or sharing.

## Project Structure

- `index.html`: The main HTML file containing the form and script references.
  
- `script.js`: JavaScript file with functions for adding dynamic form fields, profanity filtering, and generating resume content.

- `styles.css`: CSS file for styling the application, including both the form and the resume preview.

- `html2pdf.bundle.js`: Library for converting HTML to PDF.

## Setup

1. Clone the repository: `git clone https://github.com/your-username/resume-builder.git`

2. Open `index.html` in a web browser to start using the resume builder.

## Notes

- Ensure that the provided image is in a supported format (JPEG, PNG, etc.) for a proper display in the resume preview.

- Review and customize the profanity filter list in `script.js` according to your preferences.

- Regularly check for updates in the `html2pdf.bundle.js` library for the latest features and improvements.

Feel free to contribute to this project by submitting issues or pull requests. Happy resume building!
