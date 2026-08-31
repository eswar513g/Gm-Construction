# 🛒 ShopCart - Online Shopping Cart (Java Full Stack)

A complete, enterprise-grade, modern e-commerce web application built using **Java Full Stack** technologies (Java 17, Spring Boot 3.3.x, Spring Data JPA, Hibernate, MySQL/H2 Database, Spring Security, REST APIs, and an ultra-modern Responsive Frontend).

---

## 🌟 Key Features

- 📱 **Advanced Navigation & Mega Menu**: Category hierarchies (Electronics, Fashion, Books, Sports, Home Appliances), deals ticker, live search bar with instant autocomplete, dark/light theme switch.
- 🔍 **Smart Search & Multi-Faceted Filters**: Real-time debounce search, price range slider, category selection, brand filters, 4★/3★ ratings, and discount tags.
- 🛍️ **Product Showcase & Details**: High-resolution image previews, discount tags, live stock status (with low stock alert countdown), detailed technical specifications, verified customer reviews, and 5-star rating submission.
- 🛒 **Dynamic Shopping Cart & Promo Coupons**: Quantity adjuster (+ / -), automatic subtotal, coupon engine (`SAVE20`, `WELCOME50`, `FESTIVE10`, `FLAT500`), free shipping calculation, and instant grand total computation.
- ❤️ **Wishlist & 1-Click Move to Cart**: Save favorite products for later and move them into the cart with a single click.
- ⚖️ **Side-by-Side Product Comparison**: Compare up to 4 products across RAM, Storage, Processor, Display, Color, Warranty, Price, and Ratings.
- 💳 **4-Step Checkout & Mock Payment Gateway**:
  - Step 1: Delivery Address with validation
  - Step 2: Order Items & Pricing Breakdown
  - Step 3: Mock Payment Simulation (UPI QR / VPA, Credit/Debit Cards, Net Banking, Cash on Delivery)
  - Step 4: Instant Confirmation & Printable Receipt
- 🚚 **Visual 6-Step Live Order Tracking**:
  - *Order Placed $\to$ Confirmed $\to$ Packed $\to$ Shipped $\to$ Out for Delivery $\to$ Delivered*
- 🔔 **Notification Center**: In-app notifications for order updates, shipping alerts, flash deals, and promotions.
- ⚡ **Full Admin Management Dashboard**:
  - Real-time KPI Cards: Total Users, Total Products, Total Orders, Total Revenue, Pending Orders, Low Stock Items.
  - Interactive Visual Sales and Orders Charts.
  - Complete Product CRUD (Add/Edit/Delete with custom comparison specifications).
  - Category Manager & Subcategory links.
  - Order Management with 1-click status stepper progression.
  - Real-time Inventory Monitor with 1-click quick restocking.
  - Coupon Code Creator with percentage/flat discounts and expiry limits.
  - User Account Management & access control.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Backend** | Java 17+, Spring Boot 3.3.x | Core application framework & REST API server |
| **ORM / Data** | Spring Data JPA, Hibernate | Object-Relational Mapping & Database Operations |
| **Database** | MySQL 8.x / H2 In-Memory | Data persistence (Dual profile: embedded H2 for instant run + MySQL DDL) |
| **Security** | Spring Security 6.x, BCrypt | Authentication, Authorization, Password Encryption |
| **Frontend** | HTML5, CSS3 (Custom Design System), JavaScript (ES6+) | Modern, responsive, interactive single-page web UI |
| **Icons & Fonts** | FontAwesome 6, Google Fonts (Outfit & Inter) | Typography and rich vector icon aesthetics |
| **Build Tool** | Apache Maven 3.9.x | Dependency management and build packaging |

---

## 👥 Demo User Credentials

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@shopcart.com` | `admin123` | Full Dashboard, Inventory, Orders, Products, Coupons |
| **Customer** | `user@shopcart.com` | `user123` | Shopping, Cart, Wishlist, Checkout, Order Tracking, Reviews |
| **Customer 2** | `priya@shopcart.com` | `user123` | Standard Customer Account |

---

## 🏷️ Active Demo Coupons

- `SAVE20`: **20% OFF** on orders above ₹2,000 (Max discount: ₹2,000)
- `WELCOME50`: **50% OFF** for first-time orders above ₹1,500 (Max discount: ₹1,000)
- `FESTIVE10`: **10% OFF** on all orders with no minimum limit
- `FLAT500`: **Flat ₹500 OFF** on orders above ₹3,000

---

## 🚀 How to Run the Application

### Option 1: Instant Run using Maven Wrapper (Zero Configuration)

Open a terminal or PowerShell in the project directory and run:

```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux / Mac
./mvnw spring-boot:run
```

Once started, open your web browser and navigate to:
👉 **`http://localhost:8080`**

---

### Option 2: Running with MySQL Database

1. Create a MySQL database:
   ```sql
   CREATE DATABASE shopcart_db;
   ```
2. Open `src/main/resources/application.properties` and uncomment the MySQL configuration lines:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/shopcart_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
   ```
3. Run the application:
   ```bash
   .\mvnw.cmd spring-boot:run
   ```

---

## 📂 Project Structure

```
ShopCart/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/shopcart/
│       │       ├── ShopCartApplication.java       # Main Spring Boot Entry Point
│       │       ├── config/
│       │       │   ├── SecurityConfig.java        # Spring Security & CORS Configuration
│       │       │   ├── DataInitializer.java      # Pre-seeds 20+ products, categories, coupons
│       │       │   └── WebMvcConfig.java          # Static resource handler
│       │       ├── controller/
│       │       │   ├── AuthController.java        # /api/auth
│       │       │   ├── ProductController.java     # /api/products
│       │       │   ├── CategoryController.java    # /api/categories
│       │       │   ├── CartController.java        # /api/cart
│       │       │   ├── WishlistController.java    # /api/wishlist
│       │       │   ├── OrderController.java       # /api/orders
│       │       │   ├── PaymentController.java     # /api/payments
│       │       │   ├── CouponController.java      # /api/coupons
│       │       │   ├── ReviewController.java      # /api/reviews
│       │       │   ├── NotificationController.java# /api/notifications
│       │       │   └── AdminController.java       # /api/admin
│       │       ├── dto/                           # Request & Response DTOs
│       │       ├── model/                         # JPA Entities (User, Product, Order, etc.)
│       │       ├── repository/                    # Spring Data JPA Repositories
│       │       └── service/                       # Business Logic Services
│       └── resources/
│           ├── static/
│           │   ├── css/
│           │   │   └── style.css                  # Modern CSS Design System & Dark Mode
│           │   ├── js/
│           │   │   └── app.js                     # Frontend Router & Reactive Engine
│           │   └── index.html                     # Main Single-Page Web Interface
│           ├── application.properties             # App Config (MySQL + H2 fallback)
│           ├── schema.sql                         # Standalone MySQL DDL Schema
│           └── data.sql                           # Initial Seed Data Script
├── pom.xml                                        # Maven Dependencies & Plugins
├── mvnw.cmd                                       # Maven Windows Wrapper
└── README.md                                      # Documentation & Setup Guide
```

---

## 📡 REST API Reference

### Authentication
- `POST /api/auth/register` - Create a new customer account
- `POST /api/auth/login` - User authentication & token issue
- `GET /api/auth/me` - Get profile of authenticated user

### Products & Catalog
- `GET /api/products` - Filtered & sorted products search
- `GET /api/products/{id}` - Product details & specifications
- `GET /api/products/featured` - Featured catalog items
- `GET /api/products/deals` - Flash deals & discounted items
- `GET /api/products/trending` - Trending products
- `POST /api/products` - Add product (*Admin*)
- `PUT /api/products/{id}` - Update product (*Admin*)
- `DELETE /api/products/{id}` - Soft-delete product (*Admin*)

### Shopping Cart & Wishlist
- `GET /api/cart` - Retrieve user shopping cart
- `POST /api/cart/add` - Add product to cart
- `PUT /api/cart/update` - Adjust line item quantity
- `DELETE /api/cart/remove/{id}` - Remove item from cart
- `GET /api/wishlist` - Retrieve saved wishlist items
- `POST /api/wishlist/toggle/{productId}` - Toggle wishlist item
- `POST /api/wishlist/move-to-cart/{productId}` - 1-click cart migration

### Orders & Tracking
- `POST /api/orders` - Place order & simulate mock payment
- `GET /api/orders` - Retrieve customer past orders
- `GET /api/orders/track/{orderNumber}` - Live order tracking data
- `PUT /api/orders/{id}/status` - Advance order tracking status

### Admin Management
- `GET /api/admin/stats` - KPI stats & revenue metrics
- `GET /api/admin/orders` - All system orders
- `PUT /api/admin/orders/{id}/status` - Update order status
- `GET /api/admin/inventory` - Stock levels & low-stock items
- `PUT /api/admin/inventory/{id}/stock` - Restock product
- `GET /api/admin/users` - Registered user list
- `PUT /api/admin/users/{id}/toggle-active` - Toggle user status
- `POST /api/admin/coupons` - Create new promo coupon
