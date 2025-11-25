![ReadMeGIF (1)](https://github.com/user-attachments/assets/cb491190-2bd2-4fd9-b629-88e736d109d0)

About The Project
This project is an interactive geography quiz built with React. It challenges users to identify countries on an SVG map against a countdown timer. When a country is clicked, its information is fetched from the REST Countries API and displayed in a temporary info card.

The application is designed as a fun and engaging way to test and improve your knowledge of European and nearby countries.

Features
Interactive SVG Map: Click on countries directly on the map to make your selection.
Timed Gameplay: A timer counts down from 10 seconds. Correct guesses add 5 seconds to the timer. The game ends if the timer reaches zero.
Dynamic Information Display: On any click, an info card appears showing the country's name, capital, population, area, flag, and coat of arms.
Visual Feedback: Guessed countries turn green for correct answers and red for incorrect ones. The page background also changes from white to red to indicate dwindling time.
Live Scoring: Points are tracked, showing your progress throughout the quiz.
Restart Functionality: A "RESTART GAME" button allows you to reset the quiz and start over at any time.
Technologies Used
Frontend: React
Build Tool: Vite
API: REST Countries API
Styling: CSS
Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Make sure you have Node.js and npm installed on your machine.

Node.js
Installation & Setup
Clone the repository:
git clone https://github.com/William1372/Country_Info_JS.git
Navigate to the project directory:
cd Country_Info_JS
Install NPM packages:
npm install
Run the development server:
npm run dev
The application will be available at http://localhost:5173 (or the port specified in your terminal).
