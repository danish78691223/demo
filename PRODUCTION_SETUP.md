# WEBWHALE Backend & Production Setup

This project contains a full-featured backend powered by Next.js API route handlers and MongoDB (via Mongoose).

---

## 1. Database & Authentication Setup

### Environment Variables
Configure the following in `.env.local`:

```env
# MongoDB Connection String
# Local MongoDB:
MONGODB_URI=mongodb://127.0.0.1:27017/webwhale

# Or MongoDB Atlas (Cloud):
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/webwhale?retryWrites=true&w=majority

# Secret key for JWT sessions
JWT_SECRET=your_jwt_secret_key_change_in_production

# Optional: If you ever host the API on a separate domain, specify it here.
# Leave blank to use built-in Next.js `/api` route handlers.
NEXT_PUBLIC_API_URL=
```

---

## 2. MongoDB Data Models

### User Model (`models/User.js`)
- `name`: String (required)
- `email`: String (unique, required, lowercase)
- `password`: String (hashed using bcryptjs with 10 salt rounds; hidden from queries by default)
- `phone`: String
- `company`: String
- `bio`: String
- `role`: "user" | "admin"
- `currentPlan`: "Starter" | "Growth" | "Business" (default: "Starter")
- `subscription`: ObjectId reference to `Subscription`
- `createdAt`, `updatedAt`: Timestamps

### Subscription Model (`models/Subscription.js`)
- `userId`: ObjectId reference to `User`
- `plan`: "Starter" | "Growth" | "Business"
- `status`: "active" | "cancelled" | "expired" | "pending"
- `price`: Number (0 for Starter, 499 for Growth, custom for Business)
- `currency`: "INR"
- `billingPeriod`: "monthly" | "forever" | "custom"
- `startDate`: Date
- `endDate`: Date
- `features`: Array of plan features
- `paymentDetails`: { gateway, paymentId, orderId, paidAmount, paidAt }
- `createdAt`, `updatedAt`: Timestamps

---

## 3. Backend API Endpoints

### Authentication
- `POST /api/auth/signup`:
  - Registers a new user.
  - Automatically creates a default "Starter" subscription in MongoDB.
  - Generates a secure, HTTP-only JWT session cookie (`webwhale_token`).
- `POST /api/auth/login`:
  - Authenticates user credentials via bcryptjs.
  - Issues HTTP-only session cookie.
- `GET /api/auth/me`:
  - Returns authenticated user details and active subscription.
- `POST /api/auth/logout`:
  - Clears the session cookie.

### Subscriptions
- `GET /api/subscription`:
  - Retrieves active subscription and subscription history for the logged-in user.
- `POST /api/subscription`:
  - Changes or upgrades the user's plan ("Starter", "Growth", "Business").
  - Updates active subscription record and updates user's `currentPlan` in MongoDB.
- `POST /api/subscription/cancel`:
  - Cancels active subscription and reverts to the Starter plan.

### Profile
- `GET /api/users/me` (or `/api/users/profile`):
  - Retrieves current user profile.
- `PATCH /api/users/me` (or `/api/users/profile`):
  - Updates profile fields (name, phone, company, bio) in MongoDB.

---

## 4. Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```
