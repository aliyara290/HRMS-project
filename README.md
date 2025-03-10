# HRMS (Human Resource Management System)

## Project Overview
The goal of this project is to develop an HRMS (Human Resource Management System) module that enables companies to efficiently manage employees, departments, and organizational hierarchies. The system is built using Laravel 11, following best practices and leveraging suitable packages to simplify role management, document handling, attendance tracking, and notifications.

## Technologies and Tools
- **Framework:** Laravel 11
- **Database:** MySQL 
- **Frontend:** React.js / Axios
- **Authentication:** Laravel Breeze
- **Tools:** Postman

## Features
### 1. User and Company Management
- **Company Account Creation:** Each company can register, log in, and manage employees.
- **Authentication:** Secure login system using Laravel Breeze/Jetstream.
- **Role and Permission Management:**
  - Admin: Full system control.
  - HR: Manages employees and managers.
  - Manager: Manages employees within their department.
  - Employee: Limited access to personal information.
- **User Profile Management:**
  - Users can update their profile information (photo, email, phone, etc.).
  - Integration with Laravel Media Library for profile pictures and document uploads.

### 2. Employee Management
- **Employee Profiles:**
  - Add, update, and delete employees.
  - Employee details: Name, email, phone, date of birth, contract type, salary, status.
- **Career Tracking:**
  - Track salary raises, promotions, and training.
- **Contract Management:**
  - Store and manage contract types (CDI, CDD, Internship, Freelance).
  - Upload and manage employment documents.

### 3. Department and Hierarchy Management
- **Department Creation:**
  - Create and manage company departments.
  - Assign department heads and employees.
- **Hierarchy Definition:**
  - Set hierarchical relationships between employees.
- **Dynamic Organizational Chart:**
  - Visualize and interact with the company hierarchy using Livewire.
  - Drag-and-drop functionality for structure adjustments.

### 4. Leave and Recovery Day Management
- **Annual Leave:**
  - Employees earn 18 leave days after one year of service.
  - Before one year, they earn 1.5 leave days per month.
  - After one year, an additional 0.5 days are granted annually.
- **Leave Requests:**
  - Employees submit leave requests at least one week in advance.
  - Approval process: Manager ➝ HR.
  - Managers only require HR approval.
- **Leave Balance Consultation:**
  - Employees can check their available leave balance anytime.
- **Recovery Days:**
  - Extra workdays can be converted into recovery days.
  - Requests are validated by HR.
  - Employees can view their recovery balance.

## Installation Guide
### Prerequisites
- PHP 8.1 or later
- Composer
- Node.js & npm
- MySQL
- Laravel CLI

### Installation Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/aliyara290/HRMS-project.git
   cd hrms-project
   ```
2. **Install dependencies:**
   ```sh
   composer install
   npm install && npm run dev
   ```
3. **Configure the environment:**
   - Copy the `.env.example` file and rename it to `.env`.
   - Update database credentials in the `.env` file.
4. **Generate application key:**
   ```sh
   php artisan key:generate
   ```
5. **Run database migrations and seeders:**
   ```sh
   php artisan migrate --seed
   ```
6. **Start the application:**
   ```sh
   php artisan serve
   ```

## Usage
- Register a company account and log in.
- Set up user roles and permissions.
- Manage employees, departments, and hierarchy.
- Handle leave requests and recovery days.
- Track employee contracts and career progress.

