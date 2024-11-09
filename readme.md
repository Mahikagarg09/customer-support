# Customer Supoort Web App

## Introduction
Welcome to the **Customer Support Web App**! This application is designed to efficiently manage a high volume of customer inquiries and facilitate seamless communication between customers and support agents. It enables multiple agents to log in simultaneously and respond to customer messages in real time. 

This README provides comprehensive instructions for setting up, running, and testing the application.

## Features

### Core Functionality
- **Agent Messaging Portal**: An intuitive interface for agents to view and respond to customer messages.
- **Message Management**: Robust storage and retrieval of messages using a database.
- **Simulated API Endpoint**: A simple web form that simulates incoming customer messages for testing purposes.

### Advanced Features
- **Work Division**: Mechanism to ensure that multiple agents do not work on the same message simultaneously.
- **Search Functionality**: Allows searching through incoming messages and customer inquiries.
- **Real-time Updates**: Utilizes websockets to provide real-time message updates, enhancing responsiveness.
## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
- Node.js (v14.x or later)
- npm (v6.x or later)
- A modern Integrated Development Environment (IDE) such as VS Code
- A modern web browser

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Mahikagarg09/Customer-Support.git
   cd customer-support
   ```

2. **Set Up the Server**
   ```bash
   cd server
   npm install
   node index.js
   ```

3. **Set Up the Client**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the Application**
   The application will be available at **http://localhost:5173**.

## Technology Stack

- **Frontend**:
  - React.js
  - Tailwind CSS

- **Backend**:
  - Node.js
  - Express.js
  - Socket.io

- **Database**:
  - MongoDB

- **Deployment**:
  - Render and Vercel

## Snapshots
![image](https://github.com/user-attachments/assets/f041fece-6c77-45c7-b940-7757b5b23699)

**Customer Portal**
![image](https://github.com/user-attachments/assets/18800a28-50cb-4445-b35b-e894d16f1f97)
![image](https://github.com/user-attachments/assets/e96bd5c5-78da-497c-a30d-46d44171fc38)

**Agent Portal**
![image](https://github.com/user-attachments/assets/6c33d7f3-b25c-40ea-9230-a28cd60e2dc4)
![image](https://github.com/user-attachments/assets/62b09b70-841e-4f0e-928f-64f504c9fba5)

## Live Application
You can access the live version of the application here:

[Branch Messaging Web App](https://customer-support-messaging.vercel.app/)

[Demo Video](https://www.loom.com/share/3d7952201ec84e1b915b0e82c4738612?sid=48371d75-0436-4689-84ff-fd3aca38f790)
