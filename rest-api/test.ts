import fs from 'fs';
import mjml2html from 'mjml';

// Load the MJML template
const mjmlTemplate = fs.readFileSync('templates/email.mjml', 'utf8');

// Replace placeholders
const emailHtml = mjml2html(mjmlTemplate.replace('{{username}}', 'TestUser'));

// Save output
fs.writeFileSync('output/email.html', emailHtml.html, 'utf8');
console.log('✅ Email generated! Open output/email.html');
