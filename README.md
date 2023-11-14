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
- [x] Use BrowserRouter inside index.js   ( ### NEW ### )
- [x] Update Header.js
- [x] Update header.module.css    ( ### NEW ### )

## 4. Adding Thumbnails

- [x] Add HomePage component
- [x] Add AppRoutes component
- [x] Use AppRoutes in App.js
- [x] Add data.js
- [x] Add food Images
- [x] Add foodService.js   ( ### NEW , ALL FUNTION IN ONE FOLDER ### )
- [x] Update HomePage.js
  - [x] Add Reducer         ( ### NEW , REVISIT ### )
  - [x] Load foods
  - [x] Add Thumbnails.js
    - [x] Add CSS File
    - [x] Add Image
    - [x] Add Title
    - [x] Add Favorite Icon
    - [x] Add StarRating.js   ( ### NEW  ### )
      - [x] Add Star Images
      - [x] Add CSS
    - [x] Add Origins
    - [x] Add Cook Time
    - [x] Add Price.js
    - [x] Update CSS File

## 5. Adding Search

- [x] Add Search Route to AppRoutes.js   
- [x] Add Search function to foodService.js     ( ### NEW ### )
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
- [x] Use tag param in HomePage.js              ( ### NEW , TO GET VALUE FROM URL### )

## 7. Food Page

- [x] Create FoodPage Component
- [x] Add route to AppRoutes.js
- [x] Add getById function to foodService.js
- [x] Update FoodPage Component
  - [x] Load food
  - [x] Create Template
  - [x] Add Css

## 8. Cart Page                            ( ### NEW , REVISIT , IMP ### )

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
- [x] Update useCart Hook            ( ### NEW , CUSTOM HOOKS , CART FUNCTIONALITY IN USECART HOOK ### )
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