> **⚠️ OUT OF DATE.** This document describes the pre-2026 version of the site (PHP backend, single-audience course list, prices on course pages). None of that is still true. See [README.md](README.md) for the current architecture.

---

# Enrollment System Setup Guide

## Overview
This is a multi-course enrollment system that allows students to:
1. Browse and select multiple courses
2. Fill out their information
3. Submit enrollment
4. Receive confirmation email
5. Get contacted via WhatsApp with payment details

## Files Created/Modified

### New Files:
- `enrollment.html` - Enrollment form page with course cart
- `enrollment.js` - JavaScript handling for cart and form
- `enrollment.php` - Form submission and email handler

### Modified Files:
- `course-detail.html` - Updated "Enroll Now" button
- `course-detail.js` - Updated to link to enrollment page
- `styles.css` - Added enrollment page styles

## Setup Instructions

### 1. Configure Your Email & WhatsApp in enrollment.php

Open `enrollment.php` and update these lines at the top:

```php
// Your admin email address (where enrollment notifications go)
define('ADMIN_EMAIL', 'your-email@learningbubble.com'); // CHANGE THIS

// Your WhatsApp number (format: country code + number, e.g., 923001234567 for Pakistan)
define('ADMIN_WHATSAPP', '923001234567'); // CHANGE THIS to your WhatsApp number
```

**Example for Pakistan:**
- Email: `contact@learningbubble.com`
- WhatsApp: `923001234567` (03001234567 → 923001234567)

### 2. Ensure PHP Mail is Configured

The system uses PHP's built-in `mail()` function. Make sure:
- Your server has mail() enabled
- Or configure SMTP in your PHP/hosting settings
- Test sending a test email first

### 3. Test the System

1. Go to any course detail page
2. Click "Enroll Now" button
3. Add the course to cart
4. Fill in your details
5. Submit the form
6. You should receive:
   - Confirmation email at student's email
   - Enrollment email at your admin email with WhatsApp contact button

## How It Works

### Flow:
1. **User selects course** → clicks "Enroll Now"
2. **Redirects to enrollment.html?id=X** → course added to cart automatically
3. **User can add more courses** → click "Add More Courses" button
4. **Fills enrollment form** → Name, Email, Phone (most important), Age, Parent name, Message
5. **Submits form** → Data sent to enrollment.php via AJAX
6. **enrollment.php processes**:
   - Validates all fields
   - Prepares detailed email with course information
   - Includes WhatsApp contact button for admin
   - Sends enrollment email to admin
   - Sends confirmation email to student
   - Returns success response
7. **Success modal appears** → Shows student their phone number (will be contacted)
8. **Admin receives email**:
   - Shows all enrolled courses with prices
   - Shows student contact info
   - Has direct "Contact on WhatsApp" button
   - Pre-fills message with student's courses and details

### Admin Email Features:
- **Contact Button**: "Contact on WhatsApp" button opens WhatsApp with pre-written message
- **Message Includes**: Student name, courses enrolled, total amount
- **Professional HTML**: Nicely formatted email with sections
- **Quick Reference**: Easy copy-paste information

### Student Confirmation:
- Gets confirmation email thanking them
- Knows they'll be contacted on their WhatsApp number
- Sees the courses they enrolled in

## Payment Process (Manual)

1. Admin receives enrollment email
2. Admin clicks "Contact on WhatsApp" button in email
3. WhatsApp opens with student's chat pre-filled with message
4. Admin sends payment details via WhatsApp
5. Student sends payment screenshot
6. Admin confirms and adds student to course

## Customization

### Change Course Data Source:
The enrollment page uses `coursesData` from `script.js`. Make sure both files load properly.

### Change Email Template:
Edit the email template in `enrollment.php` (lines with `$emailBody =`) to customize how the enrollment email looks.

### Add More Form Fields:
In `enrollment.html`, add new form fields and in `enrollment.js`, add them to the formData.

### Change WhatsApp Pre-filled Message:
In `enrollment.php`, modify the WhatsApp link message format (around line 95):

```php
<a href=\"https://wa.me/{$adminWhatsAppNumber}?text=Your%20custom%20message%20here
```

## Troubleshooting

### Emails not sending:
- Check if your server has mail() enabled
- Check server error logs
- Ask hosting provider to enable mail functions
- Consider using an SMTP service

### WhatsApp button not working:
- Make sure WhatsApp number is in correct format (country code + number)
- Try opening the link manually: `https://wa.me/923001234567`
- Ensure you have WhatsApp Business or regular WhatsApp app

### Cart not persisting:
- Check browser console for JavaScript errors
- Make sure `enrollment.js` loads properly
- Check that `script.js` with `coursesData` is loaded first

### Form validation errors:
- Required fields: Name, Email, Phone
- Email must be valid format
- At least one course must be in cart

## Security Notes

- Form uses `sanitize_input()` to prevent XSS
- Email validation prevents invalid addresses
- Phone number pattern allows common formats

## Future Enhancements

Possible additions (not in current version):
- Database to store enrollments
- Payment gateway integration
- Automated invoice generation
- Course dashboard for students
- Email confirmation link
- Multiple language support

---

For questions or issues, contact your development team.
