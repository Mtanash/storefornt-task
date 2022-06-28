# Store front task for company i applied to

## How to configure and run application

> replace URI variable in apollo/index.js to the graphql endpoint.
> then `npm install & npm run`

### application routes

| page                      | URL          |
| ------------------------- | ------------ |
| Category page (Main page) | `/`          |
| Product info page         | `/productId` |
| Cart page                 | `/cart`      |

### Application functionality

- Category page to list all products and filter them by category.
- Product info page to display product details and attributes.
- Cart page to list all products in the cart and display the total cost.
- cart button with cart overlay to display cart products.
- Add products to cart from the category page by pressing the green cart button that appears on the product card (with default attributes) or by clicking the product cart to open the product info and choose attributes and add it to the cart.
- Once Product added to cart you can not modify it's attributes but you can change the amount of the product.
- to remove a product from the cart you have to decrease the amount of the product to 0 and it will be removed from the cart.
- you can change the currency from the currency button (default to `USD`).
