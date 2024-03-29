# Progress of project

## 1. Demo And Installation

- [x] Install [NodeJs](https://nodejs.org/en)
- [x] Install [Visual Studio Code](https://code.visualstudio.com)
- [x] Install [Git](https://git-scm.com)

## 2. Creating React App

- [x] Create React App
- [x] Remove Unnecessary Codes

## 3. Adding Header

- [x] Add Header.js
- [x] Use Header in App.js
- [x] Install react-router-dom in frontend ( ### NEW ### )
- [x] Add header.module.css
- [x] Use BrowserRouter inside index.js ( ### NEW ### )
- [x] Update Header.js
- [x] Update header.module.css ( ### NEW ### )

## 4. Adding Thumbnails

- [x] Add HomePage component
- [x] Add AppRoutes component
- [x] Use AppRoutes in App.js
- [x] Add data.js
- [x] Add food Images
- [x] Add foodService.js ( ### NEW , ALL FUNTION IN ONE FOLDER ### )
- [x] Update HomePage.js
  - [x] Add Reducer ( ### NEW , REVISIT ### )
  - [x] Load foods
  - [x] Add Thumbnails.js
    - [x] Add CSS File
    - [x] Add Image
    - [x] Add Title
    - [x] Add Favorite Icon
    - [x] Add StarRating.js ( ### NEW ### )
      - [x] Add Star Images
      - [x] Add CSS
    - [x] Add Origins
    - [x] Add Cook Time
    - [x] Add Price.js
    - [x] Update CSS File

## 5. Adding Search

- [x] Add Search Route to AppRoutes.js
- [x] Add Search function to foodService.js ( ### NEW ### )
- [x] Use Search Inside HomePage.js
- [x] Add Search Component
  - [x] Add CSS

## 6.Adding Tags Bar

### Showing The Tags:

- [x] Add sample_tags to data.js
- [x] Add getAllTags function to foodService.js
- [x] Add Tags Component
  - [x] Add Css
- [x] Use Tags Component in HomePage.js

### Showing Foods By Tag

- [x] Add Tag route to AppRoutes.js
- [x] Add getAllByTag function to foodService.js
- [x] Use tag param in HomePage.js ( ### NEW , TO GET VALUE FROM URL### )

## 7. Food Page

- [x] Create FoodPage Component
- [x] Add route to AppRoutes.js
- [x] Add getById function to foodService.js
- [x] Update FoodPage Component
  - [x] Load food
  - [x] Create Template
  - [x] Add Css

## 8. Cart Page ( ### NEW , REVISIT , IMP ### )

- [x] Create Cart Page Component
  - [x] Create css
- [x] Add cart route to the Routes
- [x] Create useCart Hook
  - [x] Add CartProvider to index.js
  - [x] Initialize cart with sample foods
- [x] Update Cart Page Compnent
  - [x] useCart hook
  - [x] Add Title Component
  - [x] Add JSX
  - [x] Add CSS
- [x] Update useCart Hook ( ### NEW , CUSTOM HOOKS , CART FUNCTIONALITY IN USECART HOOK ### )
  - [x] Add to cart
  - [x] Remove from cart
  - [x] Change quantity
  - [x] Saving To LocalStorage
- [x] In Food Page useCart for Add to cart buttons
- [x] In Header useCart for cart total count

## 9.Not Found!

- [x] Create NotFound Component
  - [x] Add CSS
- [x] Add Not Found To:
  - [x] Home Page
  - [x] Food Page
  - [x] Cart Page
- [x] Fixing Search Issue

## 10. Connect To Backend

- [x] Create backend folder
- [x] Initializing NPM Project
- [x] Copy data.ts to backend/src
- [x] npm install express cors
- [x] Create .gitignore
- [x] Create server.js
  - [x] Add & Config Express
    - [x] Add & Config Cors
  - [x] Add Food Router
    - [x] Add jsconfig.json
    - [x] Add Apis
- [x] npm install nodemon
  - [x] Add dev Script into the package.json
  - [x] npm run dev
- [x] Add axios package
  - [x] axiosConfig.js file
- [x] Connect food service to the Apis

## 11. Login Page

### Backend

- [x] Create User Router
  - [x] npm install jsonwebtoken
  - [x] Add Login Api
    - [x] Add sample_users to data.js
    - [x] Add httpStatus.js
  - [x] Add generateTokenResponse function
- [x] Add User Router To server.js

### Frontend

- [x] Create user service               ( ### MAIN ### )
  - [x] Add getUser function
  - [x] Add login function
  - [x] Add logout function
- [x] npm install react-toastify
- [x] Create useAuth hook               ( ### NEW MAIN IMP ### )
  - [x] Add user state
  - [x] Add Login function
  - [x] Add logout function
- [x] Create LoginPage component         ( ### REVISIT ### )
  - [x] Add to AppRoutes.js
  - [x] Create Custom Components
    - [x] Input Container
      - [x] CSS
    - [x] Input
      - [x] CSS
    - [x] Button
      - [x] CSS
- [x] Add useAuth to the Header component


## 12. Connecting MongoDB

- [x] Install mongoose
  - [x] Add User Model
  - [x] Add Food Model
- [x] Add .env file
  - [x] Install dotenv
  - [x] Add MONGO_URI
  - [x] Add to .gitignore
- [x] Add database.config.js
  - [x] Connect to mongodb
  - [x] Seed Users                                             ( ### NEW MAIN IMP ### )
    - [x] Install bcryptjs for password hashing
  - [x] Seed Foods                                              ( ### NEW MAIN IMP ### )
- [x] Update user.router ( Using UserModel)
  - [x] Install express-async-handler                           ( ### NEW MAIN IMP ### )
  - [x] Login Api
  - [x] generateTokenResponse
- [x] Update food.router (Using FoodModel):                     ( ### NEW MAIN IMP ### )
  - [x] Root Api ( Loading all foods )                          
  - [x] Tags api                                                ( ### NEW MAIN IMP ### )
  - [x] Search Api
  - [x] FoodId api ( Finding food by id )
- [x] Fix Image url in:
  - [x] Thumnails compnent
  - [x] Food Page component
  - [x] Cart Page component


## 13. Register Page

- [x] Add Register Page Component
  - [x] Add to AppRoutes
  - [x] Add Link to login page
  - [x] CSS
- [x] Add '/register' api to user.router.js
- [x] Add register function in userService
- [x] Add register function in useAuth hook
  - [x] Add to Register page

## 14. Loading

- [x] Create useLoading hook                             ( ### NEW MAIN IMP ### )
  - [x] Add LoadingProvider to index.js                   ( ### NEW MAIN IMP ### )
- [x] Create Loading component
  - [x] Add to App.js
  - [x] Add Image
  - [x] CSS 
- [x] Create Loading Interceptor                             ( ### NEW MAIN IMP ### )

## 15. Checkout Page    ( ### NEW MAIN IMP ### )

- [x] Fixing Loading problem
- [x] Create Checkout Page component
  - [x] Create AuthRoute                                         ( ### NEW MAIN IMP ### )
  - [x] Add to Routes
  - [x] Add css
  - [x] Create Order Items List
  - [x] Create Maps Component                                   ( ### NEW MAIN IMP ### )
    - [x] Install leaflet & react-leaflet
    - [x] Adding images to public folder
    - [x] Fixing header menu problem with map
- [x] Create Order router

  - [x] Create auth middleware                                     ( ### NEW MAIN IMP ### )
    - [x] Add UNAUTHORIZED http statuss
    - [x] Add to Order router
  - [x] Create Order Model
    - [x] Create Order Status
  - [x] Add to server.js

- [x] Connecting Frontend to Backend
  - [x] Create order service
    - [x] Add create function
  - [x] Create Auth interceptor                                     ( ### NEW MAIN IMP ### )
    - [x] Add to index.js
