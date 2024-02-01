
function addEducation() {
    const educationContainer = document.getElementById('educationContainer');
    const educationEntry = document.createElement('div');
    educationEntry.classList.add('education-entry');

    const educationInfo = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'education[]';
    input.required = true;
    educationInfo.appendChild(input);

    const dateInfo = document.createElement('div');
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'education-date[]';
    dateInfo.appendChild(dateInput);

    educationEntry.appendChild(educationInfo);
    educationEntry.appendChild(dateInfo);
    educationContainer.appendChild(educationEntry);
}

function addAchievement() {
    const achievementsContainer = document.getElementById('achievementsContainer');
    const achievementsEntry = document.createElement('div');
    achievementsEntry.classList.add('achievements-entry');

    const achievementsInfo = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'achievements[]';
    input.required = true;
    achievementsInfo.appendChild(input);

    const dateInfo = document.createElement('div');
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'achievements-date[]';
    dateInfo.appendChild(dateInput);

    achievementsEntry.appendChild(achievementsInfo);
    achievementsEntry.appendChild(dateInfo);
    achievementsContainer.appendChild(achievementsEntry);
}

function addCertification() {
    const certificationsContainer = document.getElementById('certificationsContainer');
    const certificationsEntry = document.createElement('div');
    certificationsEntry.classList.add('certifications-entry');

    const certificationsInfo = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'certifications[]';
    input.required = true;
    certificationsInfo.appendChild(input);

    const dateInfo = document.createElement('div');
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'certifications-date[]';
    dateInfo.appendChild(dateInput);

    certificationsEntry.appendChild(certificationsInfo);
    certificationsEntry.appendChild(dateInfo);
    certificationsContainer.appendChild(certificationsEntry);
}

// Modify the goToPreview and generateResumeContent functions accordingly


function goToPreview() {
    const formData = new FormData(document.getElementById('resumeForm'));
    const cleanedAbout = cleanProfanity(formData.get('about'));
    formData.set('about', cleanedAbout);

    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="styles.css">
            <script src="html2pdf.bundle.js"></script>
            <script src="https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js"></script>
            
            <title>Resume Preview</title>
        </head>
        <body>
            <div id="container" class="preview">
                <h1>${formData.get('name')}</h1>
                <div id="imageContainer"></div>
                ${generateResumeContent(formData)}
                <button id="convertButton" class="submitBtn">Download Resume</button>
            </div>
            <script>
                document.getElementById('convertButton').addEventListener('click', function() {
                    // Hide the button before capturing the HTML content
                    document.getElementById('convertButton').style.display = 'none';
                  
                    // Get the HTML content you want to convert (you can replace this with your HTML)
                    const htmlContent = document.documentElement.outerHTML;
                  
                    // Use html2pdf library to convert HTML to PDF
                    html2pdf(htmlContent, {
                      margin: 10,
                      filename: 'converted_document.pdf',
                      image: { type: 'jpeg', quality: 0.98 },
                      html2canvas: { scale: 2 },
                      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                      pagebreak: { mode: 'avoid-all' } // Avoid cutting off content on page breaks
                    });
                  
                    // Show the button after capturing the HTML content
                    document.getElementById('convertButton').style.display = 'block';
                  });
                  
                </script>
              
                <style>
                  /* Define a CSS class to hide the button */
                  .hidden {
                    display: none;
                  }
                </style>
                  
                  


            
        </body>
        </html>
    `);
}

function generateResumeContent(formData) {
    const imageLink = formData.get('imageLink');
    const email = formData.get('email');
    const linkedin = formData.get('linkedin');
    const leetcode = formData.get('leetcode');
    const github = formData.get('github');
    const about = formData.get('about');
    const education = getEntriesWithDate(formData.getAll('education[]'), formData.getAll('education-date[]'));
    const achievements = getEntriesWithDate(formData.getAll('achievements[]'), formData.getAll('achievements-date[]'));
    const certifications = getEntriesWithDate(formData.getAll('certifications[]'), formData.getAll('certifications-date[]'));

    let content = `
        <div class="container">
        <div class="header">
            <div></div>
            <div class="image-container">
                <img src="${imageLink}" alt="User Image">
            </div>
        </div>
        
        <div class="contact-info">
            <p>Email: <a href="mailto:${email}">${email}</a></p>
            <p>LinkedIn: <a href="${linkedin}" target="_blank">LinkedIn</a></p>
            <p>LeetCode: <a href="${leetcode}" target="_blank">LeetCode</a></p>
            <p>GitHub: <a href="${github}" target="_blank">GitHub</a></p>
        </div>
        
        <div class="about">
            <h2>About</h2>
            <p>${about}</p>
        </div>
        
        <div class="section">
            <h2>Education</h2>
            <ul>
                ${education.map(entry => `<li>${entry.name} - ${entry.date}</li>`).join('')}
            </ul>
        </div>
        
        <div class="section">
            <h2>Achievements</h2>
            <ul>
                ${achievements.map(entry => `<li>${entry.name} - ${entry.date}</li>`).join('')}
            </ul>
        </div>
        
        <div class="section">
            <h2>Certifications</h2>
            <ul>
                ${certifications.map(entry => `<li>${entry.name} - ${entry.date}</li>`).join('')}
            </ul>
        </div>
        </div>
    `;

    return content;
}

function getEntriesWithDate(entries, dates) {
    return entries.map((entry, index) => ({ name: entry, date: dates[index] || '' }));
}


function downloadFromPreview() {
    const formData = new FormData(document.getElementById('resumeForm'));
    const resumeContent = generateResumeContent(formData);

    const element = document.createElement('div');
    element.innerHTML = resumeContent;

    html2pdf(element, {
        margin: 10,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    });
}

function cleanProfanity(text) {
    // Function to remove profanity from the "about" field
    // Replace profanity with an empty string
    const profanityList = ['nigga', 'profanity2', 'profanity3']; // Add your list of profanity words
    const regex = new RegExp(profanityList.join('|'), 'gi');
    return text.replace(regex, '');
}

