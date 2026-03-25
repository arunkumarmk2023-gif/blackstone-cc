# Blackstone CC Website TODO

## Admin Dashboard CRUD Features (Simple Version)

- [x] Create simple fixture add/edit/delete forms
- [x] Create simple player add/edit/delete forms
- [x] Create simple news add/edit/delete forms
- [x] Integrate forms into admin dashboard tabs
- [x] Test all CRUD operations
- [x] Save checkpoint with admin functionality

## Final Updates

- [x] Update Threads logo with official image
- [x] Fix email link to use mailto: protocol
- [x] Test all updates in browser

## Contact Form Email Automation

- [x] Set up email service integration (Nodemailer)
- [x] Create email template for confirmation message (HTML and plain text)
- [x] Update Contact page form to submit data to backend
- [x] Implement tRPC procedure for contact form submission
- [x] Add email sending logic to contact procedure
- [x] Write tests for email functionality (10 tests passing)
- [x] Test email delivery in browser (form submission working)
- [x] Save checkpoint with email automation

## Contact Form Database Storage

- [x] Design and add contactSubmissions table to Drizzle schema
- [x] Create database helper functions for contact operations
- [x] Update contact.submit procedure to save submissions to database
- [x] Add admin view/list endpoint for contact submissions
- [x] Create admin dashboard component to view submissions
- [x] Write tests for contact storage functionality (8 tests passing)
- [x] Test end-to-end contact form storage
- [x] Save checkpoint with contact storage feature

## File Storage Enhancement

- [x] Verify full-stack setup and storage configuration
- [x] Add gallery table to database schema for image uploads
- [x] Create file upload helper functions and tRPC procedures
- [x] Add file upload UI components to admin dashboard
- [x] Implement gallery image upload and display
- [x] Write tests for file storage functionality (9 tests passing)
- [x] Test file uploads end-to-end
- [x] Save checkpoint with file storage features

## Weather Widget Refactoring

- [x] Locate and review current weather component
- [x] Create compact weather widget component
- [x] Add weather widget to Navigation header top right
- [x] Remove weather component from Home page
- [x] Style and test weather widget
- [x] Save checkpoint with weather widget changes

## Drag-and-Drop Bulk Image Upload

- [ ] Create drag-and-drop upload component
- [ ] Implement file validation (type, size, count)
- [ ] Add progress tracking UI with upload status
- [ ] Create tRPC batch upload procedure
- [ ] Integrate bulk upload into admin gallery tab
- [ ] Write tests for bulk upload functionality
- [ ] Test drag-and-drop end-to-end
- [ ] Save checkpoint with bulk upload feature

## Fix Join Us Form Storage

- [x] Review current Join Us form implementation
- [x] Create joiners table in database schema
- [x] Add database helper functions for joiner operations
- [x] Create tRPC procedure to save joiner submissions
- [x] Update Join Us form to submit to backend
- [x] Add joiner management view to admin dashboard
- [x] Write and run tests for joiner functionality (8 tests passing)
- [x] Test end-to-end and save checkpoint

## Navigation Menu Fixes

- [x] Fix Contact menu visibility on desktop
- [x] Verify Contact menu shows on both mobile and desktop
- [x] Save checkpoint with navigation fix

## Gallery Upload and Delete Fixes

- [x] Review gallery tab in admin dashboard
- [x] Fix image upload functionality
- [x] Fix image delete functionality
- [x] Test upload and delete operations
- [x] Save checkpoint with gallery fixes

## Fixtures & Results System

- [ ] Design database schema for fixtures and results tables
- [ ] Create database helper functions for CRUD operations
- [ ] Add tRPC procedures for fixtures and results
- [ ] Create public Fixtures & Results page with responsive tabs
- [ ] Build admin interface for managing fixtures and results
- [ ] Integrate into admin dashboard
- [ ] Write and run tests
- [ ] Test end-to-end and save checkpoint

## Sponsor Edit Functionality

- [x] Identified issue: SimpleSponsorForm not receiving sponsor prop when Edit button clicked
- [x] Added useEffect hook to update form data when sponsor prop changes
- [x] Updated AdminDashboard to pass editingSponsor data to SimpleSponsorForm
- [x] Added Cancel button to form for clearing edit state
- [x] Tested edit functionality - form now properly populates with sponsor data
- [x] Verified Cancel button clears the form and resets state
