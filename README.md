## FoodMine : *Quick Food, Faster Delivery - End your craving!*


## 📑 Synopsis 

- A food ordering system with an easy UI for a seamless experience from selection to payment. Along side with an admin panel to manage food and user levels. Fast service with quick data retrieval. 
- Optimize fast data retrieval for food item listings.


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

4. Setup .env file 
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

5. To Run Project
    ```bash

    cd frontend
    npm start run 

    cd backend
    npm run dev
    ```
 🤞🏻 *Hope you find project useful*
