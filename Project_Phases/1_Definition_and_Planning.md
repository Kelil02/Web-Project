# Phase 1 - Definition and Planning

## 1. User Personas

### Persona 1: Employee (General Worker)

- **Name**: Ayman
- **Age**: 22
- **Occupation**: Customer Service Representative
- **Location**: Helsinki
- **Goals**:
  - Wants to easily check his work schedule and clock in/out.
  - Needs a simple way to apply for sick leave or vacation.
  - Wants to keep track of company goals and progress.
- **Challenges**:
  - Sometimes forgets to clock in or out, leading to errors in timekeeping.
  - Needs a simple interface to view his schedule and communicate with the boss.
- **Needs**:
  - A clear schedule view with the ability to check if he is working on a given day.
  - A sick leave application system.
  - Messaging system to communicate directly with the boss.
  - A way to track company performance toward its goals.
- **Tech Savviness**:
  - Comfortable with technology, but prefers a simple interface.
- **Preferred Device**:
  - Uses a smartphone and computer.

---

### Persona 2: Boss (Manager)

- **Name**: Kelil
- **Age**: 22
- **Occupation**: Department Manager
- **Location**: Tampere
- **Goals**:
  - Wants to easily track employee schedules and availability.
  - Needs to approve sick leave requests and communicate with employees.
  - Wants to keep track of the team's performance and progress toward company goals.
- **Challenges**:
  - Needs to manage multiple employees' schedules and be sure everything is running smoothly.
  - Needs a simple way to approve or reject leave requests and send company updates.
- **Needs**:
  - A system for easily viewing employee schedules and leave requests.
  - An easy-to-use messaging system to communicate with employees.
  - A view of team goals and progress, as well as any updates or achievements.
- **Tech Savviness**:
  - Very comfortable with technology and needs an efficient system.
- **Preferred Device**:
  - Primarily uses a computer, but also uses a smartphone for quick checks.

---

### Persona 3: HR Manager

- **Name**: Majd
- **Age**: 20
- **Occupation**: HR Manager
- **Location**: Oulu
- **Goals**:
  - Wants to manage and approve all leave requests.
  - Needs to monitor company goals and employee performance.
  - Ensures the company is compliant with labor laws regarding working hours and leave.
- **Challenges**:
  - Needs a comprehensive view of all employee schedules and sick leave requests.
  - Must track and approve numerous applications and requests from employees.
- **Needs**:
  - A centralized dashboard to view all employee data, schedules, and leave requests.
  - A simple way to approve or reject sick leave or vacation time.
  - A system for tracking company goals and performance.
- **Tech Savviness**:
  - Highly tech-savvy, comfortable using HR software and tools.
- **Preferred Device**:
  - Uses a computer for detailed work, but also checks data on a smartphone.
 

## 2. Use Cases and User Flows

### Use Case 1: Employee (Ayman) - Check Work Schedule
- **Scenario**: Ayman wants to check if he has a shift today.
- **Steps**:
  1. Open the website.
  2. Sign in to the system.
  3. Navigate to the "Schedule" section.
  4. View his work schedule for today (e.g., shift start and end times).
  5. If necessary, check the schedules of his colleagues.

---

### Use Case 2: Employee (Ayman) - Apply for Sick Leave
- **Scenario**: Ayman is sick and needs to apply for sick leave.
- **Steps**:
  1. Open the website.
  2. Sign in to the system.
  3. Navigate to the "Leave" section.
  4. Select "Sick Leave" and fill in the required information (dates, reason).
  5. Submit the request.
  6. Wait for approval from HR or his manager.

---

### Use Case 3: Manager (Kelil) - Approve Leave Requests
- **Scenario**: Kelil needs to approve a sick leave request from an employee.
- **Steps**:
  1. Open the website.
  2. Sign in to the system.
  3. Navigate to the "Leave Requests" section.
  4. Review employee sick leave requests.
  5. Approve or reject the request.
  6. Notify the employee about the decision.

---

### Use Case 4: HR Manager (Majd) - Monitor Company Goals
- **Scenario**: Majd needs to check the company's progress toward its goals.
- **Steps**:
  1. Open the website.
  2. Sign in to the system.
  3. Navigate to the "Company Goals" section.
  4. View the progress bar showing the current progress toward company goals.
  5. Check any recent achievements or areas where the company is behind.

---

### Use Case 5: Employee (Ayman) - Register Arrival and Departure Time
- **Scenario**: Ayman needs to clock in and clock out for his shift.
- **Steps**:
  1. Open the website.
  2. Sign in to the system.
  3. Click the "Clock In" button when he arrives at work.
  4. Click the "Clock Out" button when he finishes his shift.
  5. Review his total work hours for the day.

---

### User Flow 1: Employee Checking Work Schedule
1. **Start**: Open app → Sign in → View Schedule → Check today's shift → (Optional) View colleagues' schedules.

---

### User Flow 2: Employee Applying for Sick Leave
1. **Start**: Open app → Sign in → Navigate to "Leave" → Apply for Sick Leave → Submit → Await approval.

---

### User Flow 3: Manager Approving Leave Requests
1. **Start**: Open app → Sign in → Navigate to "Leave Requests" → Review requests → Approve/Reject request → Notify employee.

---

### User Flow 4: HR Manager Monitoring Company Goals
1. **Start**: Open app → Sign in → Navigate to "Company Goals" → View progress → Check updates.

---

### User Flow 5: Employee Registering Arrival and Departure Time
1. **Start**: Open app → Sign in → Click "Clock In" → Work → Click "Clock Out" → View total work hours.

---

### User Flow 3: Personal Trainer Creating a Workout Plan
- Open app → Select Client → Create Plan → Send reminders.

## 3. UI Prototypes

![Näyttökuva 2025-03-22 132145](https://github.com/user-attachments/assets/e7796fa3-2f9f-402c-b630-2b314aabf318)
![Näyttökuva 2025-03-22 132203](https://github.com/user-attachments/assets/b5839c2f-8869-4b51-ba32-7e17b3ec3da9)


## 4. Information Architecture and Technical Design

### **Information Architecture**

1. **Home/Dashboard**  
   - Central page displaying:
     - Employee's schedule for the day.
     - Company goals progress bar.
     - Company news feed (monthly updates, employee of the month, etc.).

2. **Schedule**  
   - Employee schedule overview.
   - Option to check colleagues' schedules.
   - Ability to clock in/out for shifts.

3. **Leave Management**  
   - Apply for sick leave or vacation.
   - Managers and HR can approve/reject leave requests.
   - Calendar view for leave requests and approvals.

4. **Messaging/Communication**  
   - Messaging system between employees and their boss/HR.

5. **Company Goals**  
   - Display company progress towards goals.
   - Simple progress bar or graph.

6. **News Feed**  
   - Display company updates, achievements, employee of the month, and upcoming goals.

7. **Profile/Settings**  
   - Employee profile for updating personal information.
   - Settings for user preferences.

### **Technical Design**

#### **Back-End**:
- **Node.js** with **Express**: ( maybe )

#### **Database**:
- **SQLite**:
  - Lightweight database for storing employee schedules, leave requests, and company data.
  - Ideal for this project as it’s simple and doesn't require complex configurations.
  - 
#### **Front-End**:
- **HTML & CSS**:
  - HTML for structuring pages.
  - CSS for styling the pages to ensure they’re minimal, modern, and easy to use.
  
- **JavaScript**:
  - JavaScript will be used for making the website interactive.
  
#### **Environment**:
- **Docker**:
  - Docker will be used to create a containerized development environment.

---

## 5. Project Management and User Testing

### **Project Phases**
1. **Planning**: Define features and design the basic layout.
2. **Back-End**: Set up Node.js, Express, and SQLite.
3. **Front-End**: Design the UI with HTML, CSS, and JavaScript.
4. **Testing**: Test all features and fix bugs.
5. **Deployment**: Deploy the site using Docker.

---

### **Milestones**
- **Milestone 1**: Complete planning and setup.
- **Milestone 2**: Set up back-end.
- **Milestone 3**: Complete front-end design.
- **Milestone 4**: Test and fix bugs.
- **Milestone 5**: Deploy the site.

---

### **User Testing**
  - Test individual features.
  - Test front-end and back-end together.
  - Have real users try the site and give feedback.
"""
