<div align="center">

# 🎓 SRM Academia Scraper

### *High-Performance Backend for SRMIST Student Data*

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Express](https://img.shields.io/badge/Hono-FF6B35?style=for-the-badge&logo=hono&logoColor=white)](https://hono.dev/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)

*A powerful, fast, and reliable API for accessing SRMIST student portal data including attendance, timetables, courses, and more.*

</div>

---

## ✨ Features

- 🚀 **Lightning-fast** scraping of SRMIST student portal data
- 📊 **Complete API coverage** - attendance, timetable, calendar, user info, and courses
- 🏗️ **Modular architecture** - cleanly separated fetchers, parsers, and handlers
- 🛡️ **Robust error handling** and comprehensive data validation
- 🔧 **Easily extensible** for new endpoints and data sources
- 🔐 **Secure authentication** with session management

## 🆕 Recent Updates (June 2025)

- 🔐 **Environment Variable Support** - Secure `.env` configuration for authentication tokens
- ✅ **Enhanced Package Configuration** - Added proper metadata, keywords, and repository info
- 🚀 **Improved Server Management** - New `start.js` for cleaner server startup
- 📝 **Better NPM Scripts** - Added `dev` script with auto-reload for development
- 🏗️ **Streamlined Architecture** - Removed redundant files and improved project structure
- 🔧 **Node.js 16+ Support** - Added engine requirements for better compatibility
- 🛡️ **Security Enhancements** - Automatic validation and better credential management

## 📁 Project Structure

```
📦 srm-academia-scraper/
├── 📡 fetch/         # Fetches raw HTML/data from SRMIST portal
├── 🛠️ handler/       # API route handlers with authentication
├── 🔍 parser/        # Parses HTML/data into JSON
├── ⚙️ utils/         # Shared utilities (dynamic URLs, static data)
├── 🚀 server.js      # Main Hono application setup
├── ▶️ start.js       # Server startup script
├── 📋 package.json   # Enhanced with proper metadata and scripts
├── 📄 LICENSE        # MIT License
└── 📖 Readme.md      # This comprehensive documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- SRMIST student credentials

### Installation

1. **📥 Clone the repository:**
   ```bash
   git clone https://github.com/Saijayaranjan/SRM-Academia-Scraper-API.git
   cd SRM-Academia-Scraper-API
   ```

2. **📦 Install dependencies:**
   ```bash
   npm install
   ```

3. **⚙️ Setup environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` file with your authentication values (see setup guide below).

4. **🔥 Start the server:**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. **✅ Server running at:** `http://localhost:3000`

## 🔧 Environment Setup Guide

### 📝 Required Environment Variables

Create a `.env` file in the project root with these variables:

```bash
# CSRF Token from SRMIST login headers
CSRF_TOKEN=iamcsrcoo=your_csrf_token_here

# Session cookies from authenticated SRMIST session
SESSION_COOKIES=_iamadt_client_10002227248=your_session_token; _iambdt_client_10002227248=your_other_token; _z_identity=true

# Optional: Server configuration
PORT=3000
NODE_ENV=development
```

### 🛠️ How to Obtain Authentication Values

<details>
<summary><strong>🔍 Method 1: Using Browser Developer Tools (Recommended)</strong></summary>

1. **Open SRMIST Academia Portal:**
   - Go to `https://academia.srmist.edu.in/`
   - Open Developer Tools (F12 or Cmd+Option+I on Mac)
   - Go to the Network tab

2. **Login and Capture Requests:**
   - Enter your credentials and login
   - Look for requests to `/signin/v2/lookup/` and `/signin/v2/primary/`
   - Click on these requests to see Headers

3. **Extract Values:**
   - **Session Cookies:** Copy the entire `Cookie` header value from any authenticated request
   - **CSRF Token:** Look for `x-zcsrf-token` header and copy the value (e.g., `iamcsrcoo=abc123...`)

4. **Update Your .env File:**
   ```bash
   CSRF_TOKEN=iamcsrcoo=your_actual_csrf_token_here
   SESSION_COOKIES=_iamadt_client_10002227248=abc123...; _iambdt_client_10002227248=def456...; _z_identity=true
   ```

</details>

<details>
<summary><strong>🚀 Method 2: Using the API Authentication Flow (Dynamic)</strong></summary>

The recommended approach is to use the built-in authentication API endpoints which handle this automatically:

1. **Use the login endpoints** as described in the Authentication section below
2. **The API will generate** valid session cookies dynamically
3. **No manual token extraction needed**
4. **Sessions are managed** automatically by the application

This is the preferred method as it doesn't require manual token extraction and handles session renewals.

</details>

### 🔒 Security Features

- **🛡️ Environment Variables:** Sensitive data stored in `.env` files (never committed to Git)
- **⚠️ Automatic Validation:** Server warns if environment variables are missing
- **📝 Example File:** `.env.example` provides template with instructions
- **🚫 Git Protection:** `.gitignore` prevents accidental commit of `.env` files

## 🔐 Authentication

Before using most API endpoints, you need to obtain a session token by authenticating with your SRMIST credentials.

### 🎯 Getting a Session Token

> **💡 Pro Tip:** Follow these steps in order to get your authentication token!

<details>
<summary><strong>📋 Step-by-Step Authentication Process</strong></summary>

#### 1. **🔍 Verify your username:**
   ```sh
   curl -X POST http://localhost:3000/api/login/user \
     -H 'Content-Type: application/json' \
     -d '{"username": "your_email@srmist.edu.in"}'
   ```
   This returns an `identity` and `digest` that you'll need for the next step.

#### 2. **🔑 Authenticate with password:**
   ```sh
   curl -X POST http://localhost:3000/api/login/password \
     -H 'Content-Type: application/json' \
     -d '{
       "digest": "DIGEST_FROM_STEP_1",
       "identifier": "IDENTITY_FROM_STEP_1", 
       "password": "your_password"
     }'
   ```
   
#### 3. **🤖 Handle CAPTCHA (if required):**
   If authentication requires CAPTCHA, you'll receive a response with `captcha.required: true` and a base64 image. Solve the CAPTCHA and submit:
   ```sh
   curl -X POST http://localhost:3000/api/login/captcha \
     -H 'Content-Type: application/json' \
     -d '{
       "digest": "CAPTCHA_DIGEST",
       "captcha": "CAPTCHA_SOLUTION"
     }'
   ```

#### 4. **🍪 Extract session cookies:**
   Upon successful authentication, you'll receive session cookies in the response. Use these cookies as your `Token` header value for subsequent API calls.

</details>

### 🎯 Complete Authentication Example

<details>
<summary><strong>💻 See Full Working Example</strong></summary>

#### **Step 1: Verify username**
```sh
curl -X POST http://localhost:3000/api/login/user \
  -H 'Content-Type: application/json' \
  -d '{"username": "your_email@srmist.edu.in"}'
```

**Response:**
```json
{
  "identity": "YOUR_IDENTITY_ID",
  "statusCode": 201,
  "message": "User exists",
  "digest": "YOUR_DIGEST_HASH..."
}
```

#### **Step 2: Authenticate with password**
```sh
curl -X POST http://localhost:3000/api/login/password \
  -H 'Content-Type: application/json' \
  -d '{
    "digest": "YOUR_DIGEST_HASH...",
    "identifier": "YOUR_IDENTITY_ID",
    "password": "your_password"
  }'
```

**Response (successful):**
```json
{
  "isAuthenticated": true,
  "cookies": "_iamadt_client_10002227248=0cdacac1e2cd...; _iambdt_client_10002227248=ebb21f095fab...; _z_identity=true"
}
```

#### **Step 3: Use the cookies for API calls**
```sh
curl -X GET http://localhost:3000/api/course \
  -H 'Content-Type: application/json' \
  -H 'Token: _iamadt_client_10002227248=0cdacac1e2cd...; _iambdt_client_10002227248=ebb21f095fab...; _z_identity=true'
```

</details>

## 📚 API Endpoints

<table>
<tr>
<th>🎯 Endpoint</th>
<th>📋 Description</th>
<th>🔐 Auth Required</th>
</tr>
<tr>
<td><code>GET /api/attendance</code></td>
<td>📊 Get attendance data and statistics</td>
<td>✅ Yes</td>
</tr>
<tr>
<td><code>GET /api/course</code></td>
<td>📚 Get enrolled course details</td>
<td>✅ Yes</td>
</tr>
<tr>
<td><code>GET /api/marks</code></td>
<td>🎯 Get marks and grades</td>
<td>✅ Yes</td>
</tr>
<tr>
<td><code>GET /api/userinfo</code></td>
<td>👤 Get user profile information</td>
<td>✅ Yes</td>
</tr>
<tr>
<td><code>GET /api/timetable</code></td>
<td>⏰ Get class timetable</td>
<td>✅ Yes</td>
</tr>
<tr>
<td><code>GET /api/calendar</code></td>
<td>📅 Get academic calendar</td>
<td>✅ Yes</td>
</tr>
</table>

### 🔥 Example Request

```sh
curl -X GET http://localhost:3000/api/attendance \
  -H 'Content-Type: application/json' \
  -H 'Token: SRMIST_SESSION_TOKEN_HERE'
```

### 📝 Example Response

```json
{
  "attendance": [
    {
      "courseCode": "21CSC101J",
      "courseName": "Programming in C",
      "totalClasses": 45,
      "attendedClasses": 42,
      "percentage": 93.33,
      "status": "Good"
    }
  ],
  "status": 200
}
```

## 🛠️ Development Notes

- 🎯 **HTML Parsing:** Cheerio is used for fast and reliable HTML parsing
- 🌐 **HTTP Requests:** Axios handles all requests to the SRMIST portal  
- 🔐 **Authentication:** All endpoints require valid session cookies
- 🧪 **Testing:** Parsers are separated from fetchers for easy testing
- 🛡️ **Error Handling:** Robust error handling with proper JSON responses

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **💾 Commit your changes:** `git commit -m 'Add some amazing feature'`
4. **📤 Push to the branch:** `git push origin feature/amazing-feature`
5. **🔄 Open a Pull Request**

### 📝 Issues
Found a bug or have a feature request? Please [open an issue](https://github.com/your-repo/srm-academia-scraper/issues) with detailed information.

---

<div align="center">

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 📝 Attribution

Portions of this code are based on SRM Academia Scraper  
Copyright (c) 2025 jackwaghan  
https://github.com/jackwaghan/srm-academia-scraper

</div>
