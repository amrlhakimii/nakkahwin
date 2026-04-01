Below is a complete PRD tailored exactly to the structure you already created.
You can also copy parts of this into your FYP report, GitHub README, or portfolio.

⸻

PRODUCT REQUIREMENTS DOCUMENT (PRD)

Product Name

NakKahwin

Product Type

Web-based Wedding Planning & Information Hub

Tech Stack
	•	Vite
	•	React
	•	TypeScript
	•	TailwindCSS
	•	LocalStorage (no backend)

⸻

1. Product Overview

NakKahwin is a modern web application designed to help Malaysian couples manage wedding preparation efficiently.

The platform combines planning tools with educational resources related to the Islamic marriage process in Malaysia, including guidance on borang nikah, kursus kahwin, imam/kadi procedures, and budgeting considerations.

The system allows users to manage wedding tasks, track expenses, organize guest lists, and access structured information in one centralized interface.

All user data is stored locally in the browser using LocalStorage, eliminating the need for backend infrastructure.

⸻

2. Problem Statement

Planning a wedding involves managing multiple responsibilities including legal documentation, vendor coordination, budgeting, and event organization.

Many couples face difficulty organizing these tasks due to:
	•	scattered information sources
	•	lack of structured checklist
	•	unclear cost estimation
	•	difficulty tracking preparation progress
	•	confusion regarding Islamic marriage procedures in Malaysia

There is a need for a centralized system that simplifies planning and provides reliable guidance.

⸻

3. Objectives

Primary objectives:
	•	provide structured wedding planning workflow
	•	centralize essential nikah information
	•	enable budget monitoring
	•	simplify guest management
	•	improve preparation visibility through progress tracking

Secondary objectives:
	•	demonstrate real-world frontend architecture
	•	showcase modern UI design
	•	simulate real SaaS product experience
	•	serve as final year project deliverable

⸻

4. Target Users

Primary users:
	•	Malaysian Muslim couples preparing for marriage
	•	university students planning future weddings

Secondary users:
	•	individuals assisting wedding planning (family members)

User age range:
22 – 35 years old

⸻

5. Scope of System

The system focuses on:
	•	task management
	•	budget tracking
	•	guest organization
	•	vendor contact tracking
	•	educational resources

The system does not include:
	•	online payment integration
	•	real-time collaboration
	•	cloud synchronization
	•	external API integration

⸻

6. Functional Requirements

6.1 Dashboard Module

File location:

features/dashboard

Description:
Provides overview of planning progress.

Functions:
	•	display checklist completion percentage
	•	display budget usage summary
	•	display upcoming tasks
	•	display wedding countdown

Components:
	•	ProgressCard
	•	SummaryCard

⸻

6.2 Checklist Module

File location:

features/checklist

Description:
Allows users to manage wedding preparation tasks.

Functions:
	•	create new task
	•	edit task
	•	delete task
	•	mark task as completed
	•	categorize task
	•	assign due date
	•	display progress percentage

Task categories:
	•	legal
	•	event
	•	outfit
	•	finance
	•	family
	•	honeymoon

Data stored locally using:

useChecklist.ts
useLocalStorage.ts


⸻

6.3 Budget Module

File location:

features/budget

Description:
Tracks wedding expenses.

Functions:
	•	define total budget
	•	add expense record
	•	categorize expense
	•	calculate total spent
	•	calculate remaining budget

Expense categories:
	•	venue
	•	catering
	•	outfit
	•	photographer
	•	doorgift
	•	makeup artist

⸻

6.4 Guest Module

File location:

features/guests

Description:
Manages invitation list.

Functions:
	•	add guest name
	•	assign guest group
	•	record number of attendees (pax)
	•	track RSVP status

Guest groups:
	•	bride family
	•	groom family
	•	friends
	•	colleagues

⸻

6.5 Timeline Module

File location:

features/timeline

Description:
Displays preparation timeline.

Functions:
	•	display recommended preparation schedule
	•	show milestone dates
	•	track time remaining before wedding

Example milestones:

12 months before wedding
6 months before wedding
3 months before wedding
1 month before wedding

⸻

6.6 Vendor Module

File location:

features/vendors

Description:
Stores vendor contact information.

Functions:
	•	add vendor
	•	categorize vendor service
	•	store contact details
	•	store price estimation
	•	add notes

Vendor categories:
	•	photographer
	•	makeup artist
	•	pelamin provider
	•	catering provider
	•	emcee

⸻

6.7 Notes Module

File location:

features/notes

Description:
Stores general notes.

Functions:
	•	create note
	•	edit note
	•	delete note

Example uses:
	•	theme ideas
	•	wedding concept
	•	reference links

⸻

6.8 Information Center Module

File location:

features/info
data

Description:
Provides educational resources regarding Islamic marriage procedures in Malaysia.

Sections:

Borang Nikah Guide

Explains required documents and application steps.

Kursus Nikah Guide

Explains course purpose and process.

Imam / Kadi Guide

Explains appointment procedure.

Budget Guide

Provides estimated cost ranges.

Checklist Guide

Provides recommended preparation tasks.

Content stored in static files:

data/infoContent.ts
data/kursusNikah.ts
data/budgetGuide.ts


⸻

7. Data Management

All data stored locally using browser LocalStorage.

Implementation handled through:

useLocalStorage.ts

Data format:

JSON structure.

Example:

Task object:
	•	id
	•	title
	•	category
	•	completed
	•	dueDate

Expense object:
	•	id
	•	name
	•	amount
	•	category
	•	date

Guest object:
	•	id
	•	name
	•	group
	•	pax
	•	rsvpStatus

Vendor object:
	•	id
	•	name
	•	category
	•	contact
	•	price
	•	notes

⸻

8. Non Functional Requirements

Performance
	•	fast loading time
	•	minimal render delay
	•	optimized component structure

Usability
	•	simple navigation
	•	clean interface
	•	clear typography
	•	consistent spacing

Compatibility
	•	modern web browsers
	•	desktop optimized
	•	responsive layout

Security
	•	no sensitive data stored externally
	•	no online authentication required

⸻

9. User Interface Requirements

Design principles:
	•	minimalist layout
	•	soft shadows
	•	rounded components
	•	neutral color palette
	•	readable typography

Component design:
	•	reusable UI components
	•	consistent spacing
	•	visual hierarchy

⸻

10. User Flow

User opens application

User views dashboard overview

User creates checklist tasks

User tracks budget expenses

User manages guest list

User reads information center guides

User monitors progress until wedding day

⸻

11. Future Improvements

Possible future enhancements:
	•	cloud database integration
	•	authentication system
	•	shared planning between partners
	•	PDF export
	•	vendor recommendation system
	•	calendar sync
	•	mobile app version
