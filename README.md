# Geetha - Area Chart Application

A Chart.js-based area chart application for displaying "Top 5 Products - Last 12 Weeks" data, designed for Looker Studio integration.

## Features

- 📊 Interactive area chart using Chart.js
- 🔗 Google Apps Script integration for real-time data
- 📱 Responsive design
- 🛡️ Fallback sample data when external data is unavailable
- 🎨 Modern, clean UI with Slovak localization

## Setup

1. **Local Development:**
   ```bash
   # Start a local web server
   python3 -m http.server 8000
   # or
   npx serve .
   ```

2. **Access the application:**
   - Open your browser and navigate to `http://localhost:8000`

## Configuration

The application is configured to fetch data from a Google Apps Script:
- **Script URL:** Configured in the `CONFIG` object (line 77-78)
- **Function:** `getWeekly12Data`

## Data Structure

The application expects data in the following format:
```javascript
{
  week: "YYYY-MM-DD",
  productName: "Product Name",
  productCode: "PRODUCT_CODE",
  totalPrice: 123.45,
  totalQuantity: 10
}
```

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Chart.js
- Google Apps Script API

## Browser Support

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge
