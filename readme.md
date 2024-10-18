# Branch Messaging Web App

## Introduction
Welcome to the **Branch Messaging Web App**! This application is designed to efficiently manage a high volume of customer inquiries and facilitate seamless communication between customers and support agents. It enables multiple agents to log in simultaneously and respond to customer messages in real time. 

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

## Live Application
You can access the live version of the application here:

[Branch Messaging Web App](https://customer-support-messaging.vercel.app/)
```
