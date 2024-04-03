
# Personal Budget API

Welcome to the Personal Budget API! This project allows clients to create and manage a personal budget using Envelope Budgeting principles. Users can manage budget envelopes and track the balance of each envelope. The API follows best practices regarding REST endpoint naming conventions, proper response codes, etc.

## Getting Started 🚀

To get started with the Personal Budget API on your local machine, follow these steps:

### Prerequisites

Make sure you have the following software installed on your machine:

-   Node.js
-   npm (Node Package Manager)

### Installation

1.  Clone the repository to your local machine:
    
    bashCopy code
    
    `git clone git@github.com:ahmadawji/personal-budget-1.git` 
    
2.  Navigate to the project directory:
    
    bashCopy code
    
    `cd personal-budget-1` 
    
3.  Install dependencies:
    
    bashCopy code
    
    `npm install` 
    
4.  Start the server:
    
    bashCopy code
    
    `npm start` 
    

### Usage

Once the server is running locally, you can use tools like Postman or curl to interact with the API endpoints.

-   Create a new budget envelope:
    `POST /envelopes` 
    
-   Get a list of all budget envelopes:
    `GET /envelopes` 
    
-   Get details of a specific budget envelope:
    `GET /envelopes/:id` 
    
-   Update a budget envelope:
    `PUT /envelopes/:id` 
    
-   Delete a budget envelope:
    `DELETE /envelopes/:id`  

### Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request with any improvements or new features.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgments

-   Envelope Budgeting principles
-   RESTful API design best practices
-   Node.js community for amazing tools and resources

Thank you for using the Personal Budget API😄! If you have any questions or feedback, please don't hesitate to reach out.
