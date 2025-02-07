export const responseData = {
    "message": "List of User stories generated successfully",
    "list_of_user_stories": [
      {
        "task_id": 9491,
        "title": "User Registration",
        "story_explanation": "As a new user, I want to register an account using my email and password, so that I can start shopping for electronics on the platform. This will enable me to save my shopping cart, track orders, and receive personalized recommendations.",
        "acceptance_criteria": [
          "- The system shall display a registration form with fields for email and password.",
          "- The system shall validate the email format and password strength during registration.",
          "- The system shall create a new user account upon successful registration and display a confirmation message."
        ]
      },
      {
        "task_id": 3908,
        "title": "User Login",
        "story_explanation": "As a registered user, I want to log into my account using my email and password, so that I can access my saved shopping cart, order history, and account settings.",
        "acceptance_criteria": [
          "- The system shall provide a login form with fields for email and password.",
          "- The system shall authenticate the user credentials against the stored data.",
          "- The system shall grant access to the user’s account upon successful login and display a welcome message."
        ]
      },
      {
        "task_id": 5703,
        "title": "Password Reset",
        "story_explanation": "As a user who has forgotten my password, I want to reset it through email verification, so that I can regain access to my account without creating a new one.",
        "acceptance_criteria": [
          "- The system shall provide an option to reset the password on the login page.",
          "- The system shall send a password reset link to the user's registered email.",
          "- The system shall allow the user to set a new password upon clicking the link and display a success message."
        ]
      },
      {
        "task_id": 3977,
        "title": "Product Browsing",
        "story_explanation": "As a user, I want to browse through the available electronic products with images, descriptions, and prices, so that I can make informed purchasing decisions.",
        "acceptance_criteria": [
          "- The system shall display a list of products with images, descriptions, and prices.",
          "- The system shall allow users to view detailed information about each product.",
          "- The system shall paginate the product list for easy navigation."
        ]
      },
      {
        "task_id": 1571,
        "title": "Product Search",
        "story_explanation": "As a user, I want to search for products by name or category, so that I can quickly find specific items I am interested in.",
        "acceptance_criteria": [
          "- The system shall provide a search bar for entering product names or categories.",
          "- The system shall display search results relevant to the entered keywords.",
          "- The system shall allow users to refine search results using filters for price, popularity, and rating."
        ]
      },
      {
        "task_id": 2557,
        "title": "Shopping Cart Management",
        "story_explanation": "As a user, I want to add products to my shopping cart, view, update, or remove items, and see the total cost, so that I can manage my purchases before checkout.",
        "acceptance_criteria": [
          "- The system shall allow users to add products to the shopping cart.",
          "- The system shall display the cart contents with options to update quantities or remove items.",
          "- The system shall calculate and display the total cost of items in the cart."
        ]
      },
      {
        "task_id": 6946,
        "title": "Order Placement",
        "story_explanation": "As a user, I want to place an order for items in my shopping cart, so that I can purchase the selected products and receive them at my specified address.",
        "acceptance_criteria": [
          "- The system shall provide a checkout process for placing orders.",
          "- The system shall collect necessary shipping and billing information.",
          "- The system shall send an order confirmation email to the user upon successful order placement."
        ]
      },
      {
        "task_id": 6516,
        "title": "Payment Processing",
        "story_explanation": "As a user, I want to securely pay for my order using a third-party payment gateway, so that I can complete my purchase safely and efficiently.",
        "acceptance_criteria": [
          "- The system shall integrate with a third-party payment gateway for processing payments.",
          "- The system shall securely handle and encrypt payment information.",
          "- The system shall confirm successful payment and proceed with order processing."
        ]
      },
      {
        "task_id": 1200,
        "title": "Review and Rating Submission",
        "story_explanation": "As a user, I want to submit reviews and ratings for products I have purchased, so that I can share my experience with other potential buyers.",
        "acceptance_criteria": [
          "- The system shall allow users to submit a review and rating for purchased products.",
          "- The system shall display the average rating and reviews for each product.",
          "- The system shall moderate reviews to ensure compliance with community guidelines."
        ]
      }
    ]
  };