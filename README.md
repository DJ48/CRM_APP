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
				"name" : "Deepak",
 				"userId" : "DJ",
  				"email" : "dj@gmail.com",
 				"password" : "Welcome1"
			}
	
        
     * SignIn Api :- The user will pass email and password for logging in. It will return a auth token that you have to use in authorization for other Api.

        ```
        URL: http://127.0.0.1:3000/api/v1/signin
        Method :- GET
        
        Input JSON:-
        {
	        "email":"test@gmail.com",
	        "password":"12"
        }
        
        Output JSON:-
        {
	        "success": true,
	        "msg": "Successfully logged in ",
	        "data": {
		        "username": "test@gmail.com",
		        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ0NzcyMDAwLCJleHAiOjE2NDU2MzYwMDB9.h89IJaB-Mpk_ozJtkHHc98sLLKjcaatxwRaqiXKOVbk"
	        }
        }
        ```
        <b>Note:- Save the auth token that you got as an output after login. It will be used in calling other APIs.</b>
     
     * ForgetPassword Api :- The user will pass email and secret code as input and this api will display the user password. 

        ```
        URL: http://127.0.0.1:3000/api/v1/forgetPassword
        Method: GET
        
        Input JSON:-
        {
	        "email":"test@gmail.com",
	        "secret":"1"
        }
        
        Output JSON:-
        {
	        "success": true,
	        "msg": "Successfully displayed the password ",
	        "data": {
		        "password": "12"
	        }
        }
        ```
    * Add Comment Api :- The user will pass post and auth token as input. The post will be successfully added in the database.

        ```
        URL:- http://127.0.0.1:3000/api/v1/post/add
        Method: POST
        
        Input JSON:-
        {
	        "post":"post by user1."
        }
        
        Input Header:
            type:- auth
            value:- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ0NzcyMDAwLCJleHAiOjE2NDU2MzYwMDB9.h89IJaB-Mpk_ozJtkHHc98sLLKjcaatxwRaqiXKOVbk
            Note:- This value was generated during login. 
        
        Output JSON:-
        {
	        "success": true,
	        "msg": "Successfully added the post ",
	        "data": {
		        "post": "post by user1."
	        }
        }
        ```
    * Get ALL Comments Api :- The user will pass auth token as header and this api will display all the user's Post.

        ```
        URL: http://127.0.0.1:3000/api/v1/post/get
        Method: GET
        
        Input Header:
            type:- auth
            value:- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ0NzcyMDAwLCJleHAiOjE2NDU2MzYwMDB9.h89IJaB-Mpk_ozJtkHHc98sLLKjcaatxwRaqiXKOVbk
            Note:- his value was generated during login.
       
       Output JSON:-
        {
	        "success": true,
	        "msg": "Successfully displaying the post ",
	        "data": {
		        "post": [
			        {
				        "post_num": 1,
				        "post": "post by user1.",
				        "createdAt": "2022-02-13T17:18:21.000Z"
			        },
			        {
				        "post_num": 2,
				        "post": "another post by user 1.",
				        "createdAt": "2022-02-13T17:28:56.000Z"
			        },
			        {
				        "post_num": 3,
				        "post": "Hi i am user 2.",
				        "createdAt": "2022-02-13T17:32:11.000Z"
			        },
			        {
				        "post_num": 4,
				        "post": "User 2 is on vacation.",
				        "createdAt": "2022-02-13T17:33:54.000Z"
			        }
		        ]
	        }
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
