## FoodMine : *Quick Food, Faster Delivery - End your craving!*


## 📑 Synopsis 

- A food ordering system with an easy UI for a seamless experience from selection to payment. Along side with an admin panel to manage food and user levels. Fast service with quick data retrieval. 
- Optimize fast data retrieval for food item listings using `Redis caching` in memory database.
- Limit API request using `custom Rate Limiter` based on `Token Bucket Rate Limiting Algorithm` , reducing server load by `70%` 


## 📜 Features

1. **Authentication and Authorization:**
   - Secure user authentication with JWT tokens and Bcrypt.js for Password hasing.
   - Two role base system : User and Admin

2. **User Functionality:**
   - Browse food items and manage cart.
   - View live location and update address.
   - Make payments via PayPal and receive confirmation emails.
   - Access order history.
   - Update Profile

3. **Admin Functionality:**
   - Add, update, or delete food items.
   - View all user orders.
   - Manage user details.

## 🛠️Tech Stack

**Client:** 
* React
* Context API
* CSS

**Server:** 
* NodeJs
* Express
* Cloudinary
* PayPal Payment
* Nodemailer


**Database:**
* MongoDB
* Redis ( in memory store )


## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Adityajparmar37/FOODMINE.git
   ```

2. Go to backend and run 
    ```bash
    cd backend
    npm install
    ```

3. Go to frontend and run
    ```bash
    cd frontend
    npm install
    ```

4. Install Redis
   - Install Docker Desktop/Docker daemon from:
     ```bash
     https://www.docker.com/products/docker-desktop/
     ```

    Run all following commands in terminal
     
   - Pull Redis Image
     ```bash
     docker pull redis
     ```
   - Expose Redis on a Port
     ```bash
     docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
     ```
   - Start Docker
     ```bash
     docker ps
     ```
     Note: After this you will get a ID copy that

     
   - Start Redis
     ```bash
     docker exec it <id> bash

     redis-cli
     ```
     

* **4.1)** *OR Install it without docker through following steps*:
        
   **For Linux Users**:
    
    1. Install Redis:
       ```bash
       sudo apt-get update
       sudo apt-get install redis-server
       ```
    
    2. Start the Redis server:
       ```bash
       redis-server
       ```
    
    **For Windows Users:**
    
    Use Windows Subsystem for Linux (WSL) to install Redis:
    
    1. Install WSL and a Linux distribution (e.g., Ubuntu) from the Microsoft Store.
    2. Open the WSL terminal and follow the Linux instructions to install Redis.

   

5. Setup .env file 
    ```bash
    MONGO_URI = "Your MongoDB Database URI"

    JWT_KEY = "Your secret key" 

    PAYPAL_CREDIT_EMAIL = "Your email of paypal"
    PAYPAL_CREDIT_PASSWORD = "Password by paypal"

    EMAIL= "Email to send order confirmation mail"
    MAILPASS = "Google app-pass" 

    CLOUDINARY_CLOUD_NAME = "Your cloudinary cloud name"
    CLOUDINARY_API_KEY = "Your cloudinary cloud api key"
    CLOUDINARY_API_SECRET = "Your cloudinary cloud api secret"
    ```

6. To Run Project
    ```bash

    cd frontend
    npm start run 

    cd backend
    npm run dev
    ```
 🤞🏻 *Hope you find project useful*
