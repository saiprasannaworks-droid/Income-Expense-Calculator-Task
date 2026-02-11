# Expense Tracker (Income & Expense Calculator)

## Overview
This is a fully functional Income & Expense Calculator built using HTML, CSS, and Vanilla JavaScript. The application allows users to add, edit, delete, and filter transactions while automatically calculating total income, total expenses, and net balance. All data is stored in Local Storage so it persists even after refreshing the browser.

---

## Features

- Add income transactions
- Add expense transactions
- Edit existing transactions
- Delete transactions
- Filter transactions (All / Income / Expense)
- Automatically calculate:
  - Total Income
  - Total Expense
  - Net Balance
- Reset input fields
- Persistent storage using Local Storage
- Fully responsive design (Mobile + Desktop)

---

## Technologies Used

- HTML5
- CSS3 (Flexbox + Responsive Design)
- JavaScript (Vanilla JS)
- Local Storage API

---

## How It Works

The application uses a central `state` object to manage:

- Transactions
- Income total
- Expense total
- Balance
- Active filter

Whenever a transaction is added, edited, or deleted:

1. The state updates
2. Totals are recalculated
3. UI is re-rendered
4. Data is saved to Local Storage

Local Storage ensures that user data remains available even after page reload.

---

## Project Structure

expense-tracker/
│
├── index.html
├── index.css
├── index.js
│
└── assets/
    └── icons/
        ├── edit.svg
        └── trash.svg

---

## How To Run

1. Download or clone the project.
2. Open the project folder.
3. Open `index.html` in any browser.

No additional setup or dependencies required.

---



## Author

Developed as a Full Stack JavaScript practice project.

