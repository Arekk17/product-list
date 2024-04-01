# Project: Product List from API

## Introduction
This project is developed using React, TypeScript, Redux, and Material UI (MUI), based on Node.js version 20 and NPM. The aim is to create an application displaying a table of products fetched from an external API, with pagination and filtering by ID functionality.
## System Requirements
- Node.js (version 20)
- NPM
## Key Dependencies
- React
- TypeScript
- Redux
- Material UI (MUI)
- Fetch (for API requests)
- Jest and React test lib (for unit testing)

## Instalation
 1. Install Node.js (version 20).
 2. Clone the project repository.
 3. Run npm install in the project directory.

# Project Structure
```
/product-list
|-- /public
|-- /src
    |-- /components
        |-- /Input
            |-- FilterInput.tsx
        |-- /Modal
            |-- ProductDetailsModal.tsx
        |-- /Pagination
            |-- Pagination.tsx
        |-- /ProductTable
            |-- ProudctTable.tsx
    |-- /Page
        |-- ProductList.tsx
    |-- /store
        |-- /slices
            |-- productsSlice.ts
        |-- /thunks
            |-- productsThunks.ts
        |-- store.ts
    |-- /tests
        |-- FilterInput.test.tsx
        |-- Pagination.test.tsx
        |-- ProudctsTable.test.tsx
    |-- /types
        |-- productTypes.ts
|-- package.json
|-- tsconfig.json
```

## Key Features

- **Redux Store Configuration**: Use `@reduxjs/toolkit` for state management.
- **API**: Implement an API client to fetch product data. 
- **ProductTable**: A component using Material UI for product data display with pagination and filtering options.

## Running the Application

To start the application, use `npm start`, accessible at the default development server address. [product-list-page](https://product-list-pearl.vercel.app/)

## Testing

For running unit tests, utilize `npm test`, leveraging Jest for correctness verification.
