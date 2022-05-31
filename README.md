# CRM_APP

## Description

CRM application that can be leveraged to accept the customer complaints and provide the complete life cycle management of the issues raised by the customers.

Features:-
1. Customer</br>
    -> Should be able to register</br>
    -> Should be able to login himself for registering/viewing complains</br>
    -> Should be able to raise an issue</br>
    -> Should be able to check the latest status of the issues raised by him</br>
    -> Should be able to modify the issue raised</br>
    -> Should be able to check the complete history of the issues raised</br>
    -> Should be able to close my ticket myself</br>
2. Engineer</br>
    -> Should be able to accept an issue</br>
    -> Should be able to update an issue</br>
    -> Should be able to close an issue</br>
    -> Should be able to see the complete list of issues assigned to him</br>
    -> Should be able to search for an issue</br>
    -> Should be able to filter the issues assigned to him based on the creation date</br>
3. Admin</br>
    -> Should be able to see all the customer's non-PII details</br>
    -> Should be able to see all the Engineers</br>
    -> Should be able to see all the tickets details</br>
    -> Should be able to see all the active tickets</br>
    -> Should be able to filter the tickets based on status | date, etc</br>
    -> Should be able to re-assign a ticket to another Engineer</br>
    -> Should be able to add a new Engineer</br>
    -> Should be able to remove a new Engineer</br>

### Tech Stacks
   <b>1. Language and the server: </b>Javascript & Node.js</br>
   <b>2. Framework: </b>Express</br>
   <b>3. Database and ODM: </b>MongoDb & Mongoose</br>
    
      
## Getting Started

### Installation & Setup

1. Install [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/try/download/community)
2. Clone this repository and install the dependencies.
    ```
      git clone https://github.com/DJ48/CRM_APP.git
      cd CRM_APP
      npm install
    ```     
3. Now, within the CRM_APP directory. Start the server.
    ```
      node server.js
    ```
    
### Executing program

1. Download [Insomnia](https://insomnia.rest/download) or [Postman](https://www.postman.com/downloads/) for web api testing.
2. I am gonna explain each api and their input json.
    * SignUp Api :- </br>
    	i) Customer :- The user will pass name, userId, email, password for customer registration.
	 
        	URL: http://127.0.0.1:8081/crm/api/v1/auth/signup
        	Method: POST
        
        	Input JSON:-
        	{
				"name" : "Deepak",
 				"userId" : "DJ",
  				"email" : "dj@gmail.com",
 				"password" : "Welcome1"
			}
		ii) Engineer :- The user will have to pass an extra field (i.e. userType) for engineer registration.</br>
		
			URL: http://127.0.0.1:8081/crm/api/v1/auth/signup
        	Method: POST
        
        	Input JSON:-
        	{
				"name" : "Rahul",
 				"userId" : "RJ",
  				"email" : "rj@gmail.com",
 				"password" : "Welcome12",
				"userType" : "ENGINEER"
			}
	
        
     * SignIn Api :- The user will pass userId and password for logging in. It will return an access token that you have to use in authorization for other Api. Engineers can only login when they got approved by Admin user.

        ```
        URL: http://127.0.0.1:3000/api/v1/signin
        Method :- GET
        
        Input JSON:-
        {
	        	"userId":"DJ",
	    	"password":"Welcome1"
        }
        
        Output JSON:-
        {
			"name": "Deepak",
			"userId": "DJ",
			"email": "dj@gmail.com",
			"userType": "CUSTOMER",
			"userStatus": "APPROVED",
			"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRKIiwiaWF0IjoxNjUzOTc3NzkyLCJleHAiOjE2NTM5NzgzOTJ9.dOpvxLN9vp189F_uvRTM4jsICABMSurKJsO8oEKwkO0"
		}
        ```
        <b>Note:- Save the access token that you got as an output after login. It will be used in calling other APIs.</b>
     
     * Create Ticket Api :- The user will pass email and secret code as input and this api will display the user password. 

        ```
        URL: http://127.0.0.1:8081/crm/api/v1/tickets
        Method: POST
        
        Input JSON:-
        {
			"title" : "My first Ticket",
			"description" : "My balance is not updated.",
			"ticketPriority" : 1
		}
        
        Output JSON:-
        {
	        	{
				"title": "My first Ticket",
				"description": "My balance is not updated.",
				"ticketPriority": 1,
				"status": "OPEN",
				"reporter": "DJ",
				"assignee": "RJ",
				"id": "6295c018f0cd0c3f89dac720",
				"createdAt": "2022-05-31T07:13:28.297Z",
				"updatedAt": "2022-05-31T07:13:28.298Z"
			}
        }
        ```
    * Get All Tickets Api :- The user will pass access token as header and this api will display all the tickets raised by the authenticated user. User can also filter the tickets based on the status.

        ```
        URL:- http://127.0.0.1:8081/crm/api/v1/tickets  or (with filter) http://127.0.0.1:8081/crm/api/v1/tickets?status=OPEN
        Method: GET
        
        Input Header:
            type:- x-access-token
            value:- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRKIiwiaWF0IjoxNjUzOTg3MTg2LCJleHAiOjE2NTM5ODc3ODZ9.F-HHbseNsvvmu0fpX_DqiBQ6h7wrSvAOfT_1cxyVrtw
            Note:- This value was generated during login.
        
        Output JSON:-
        {
	        	{
				"title": "My first Ticket",
				"description": "My balance is not updated.",
				"ticketPriority": 1,
				"status": "OPEN",
				"reporter": "DJ",
				"assignee": "RJ",
				"id": "6295c018f0cd0c3f89dac720",
				"createdAt": "2022-05-31T07:13:28.297Z",
				"updatedAt": "2022-05-31T07:13:28.298Z"
			}
        }
        ```
    * Update Ticket Api :- The user will pass ticket_id as request parameter and the body with the fields that they want to update.

        ```
        URL: http://127.0.0.1:8081/crm/api/v1/tickets/6295c018f0cd0c3f89dac720
        Method: PUT
        
        Input JSON:
		{
			"title" : "Trying to update the ticket",
			"description" : "My balance is not updated.",
			"ticketPriority" : 2,
			"status" : "CLOSED"
		}
   
    	Output JSON:-
        {
			"title": "Trying to update the ticket",
			"description": "My balance is not updated.",
			"ticketPriority": 2,
			"status": "CLOSED",
			"reporter": "DJ",
			"assignee": "RJ",
			"id": "6295c018f0cd0c3f89dac720",
			"createdAt": "2022-05-31T07:13:28.297Z",
			"updatedAt": "2022-05-31T07:13:28.298Z"
		}
        ```
    * Filter Comment by user Api :- The user will pass auth token as header and this api will display the post of the logged in user. 

        ```
        URL: http://127.0.0.1:3000/api/v1/post/filter
        Method: POST
        
        Input Header:
            type:- auth
            value:- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ0NzcyMDAwLCJleHAiOjE2NDU2MzYwMDB9.h89IJaB-Mpk_ozJtkHHc98sLLKjcaatxwRaqiXKOVbk
            Note:- This value was generated during login.
        
        Output JSON:-
        {
	        "success": true,
	        "msg": "Successfully filtered the post ",
	        "data": {
		        "post": [
			        {
				        "id": 1,
				        "post": "post by user1.",
				        "createdAt": "2022-02-13T17:18:21.000Z"
			        },
			        {
				        "id": 2,
				        "post": "another post by user 1.",
				        "createdAt": "2022-02-13T17:28:56.000Z"
			        }
		        ]
	        }
        }
        ```

## Author

Deepak Jaiswal

[Read & Rate my Article on Linked List](https://www.geeksforgeeks.org/multiplication-of-two-polynomials-using-linked-list/)

## Version History

* v1
    * Initial Release
