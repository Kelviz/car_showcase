# Car Rental Showcase

This is a **Car Rental Platform** built using **Next.js**. The platform allows users to browse cars, view car details, register, log in, and book cars. Users can also manage their bookings, viewing both current and expired bookings.

## Features

- **Car Showcase on Homepage**: Users can browse through the available cars listed on the homepage.
- **Car Details**: Users can click on a car to view its detailed specifications, including car class, fuel type, transmission, and more.
- **Car Booking**: Registered users can book cars directly from the platform.
- **User Authentication**: Users can register, log in, and log out.
- **Booking Management**: Users can view their current and expired bookings in a dedicated section.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: CSS Modules / Tailwind CSS (specify based on your choice)
- **State Management**: React Hooks, Context API
- **API**: Integration with a backend API (e.g., Django Rest Framework)
- **Payment**: Integration with Paystack for handling payments (optional)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kelviz/car_showcase.git
   cd car_showcase

   ```

2. Install dependencies:
   npm install

3. Create an .env.local file in the root directory and add the following environment variables:
   NEXT_PUBLIC_API_URL=http://localhost:8000

4. Run the development server:
   npm run dev

5. Open your browser and navigate to http://localhost:3000
