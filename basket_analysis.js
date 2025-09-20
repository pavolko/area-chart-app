/**
 * Google Sheets Data Processing Application
 * Generic template for Google Sheets data operations
 */

// Configuration - Update these IDs for your specific use case
const SOURCE_SPREADSHEET_ID = '1Xk2vFWtXUn_Qsrvm7VjFt-tl5ee5ZmHRiKMQ7Bi5Sk8'; // Source data
const TARGET_SPREADSHEET_ID = '1kfGplzpolt0-64TvIhYsUbSP3xRym5SJLl-BQJD3Zsc'; // Target for processed data
const SOURCE_SHEET_NAME = 'shoptet_orders_with_units'; // Source sheet name
const TARGET_SHEET_NAME = 'Basket Analysis'; // Target sheet name

/**
 * Read data from the source Google Sheets
 * @returns {Array} Array of data from the source sheet
 */
function readSourceData() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SOURCE_SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SOURCE_SHEET_NAME);
    
    if (!sheet) {
      throw new Error(`Source sheet "${SOURCE_SHEET_NAME}" not found`);
    }
    
    // Get all data from the sheet
    const data = sheet.getDataRange().getValues();
    
    console.log(`📊 Read ${data.length} rows from source spreadsheet`);
    console.log(`📋 Headers: ${data[0].length} columns`);
    
    return data;
  } catch (error) {
    console.error('❌ Error reading source data:', error.message);
    throw error;
  }
}

/**
 * Clean up the target sheet (clear all content)
 */
function cleanTargetSheet() {
  try {
    const spreadsheet = SpreadsheetApp.openById(TARGET_SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(TARGET_SHEET_NAME);
    
    if (!sheet) {
      throw new Error(`Target sheet "${TARGET_SHEET_NAME}" not found`);
    }
    
    // Clear all content
    sheet.clear();
    console.log(`🧹 Cleaned target sheet: ${TARGET_SHEET_NAME}`);
  } catch (error) {
    console.error('❌ Error cleaning target sheet:', error.message);
    throw error;
  }
}

/**
 * Write data to target sheet
 * @param {Array} data - Data to write to the target sheet
 */
function writeDataToTarget(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(TARGET_SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(TARGET_SHEET_NAME);
    
    // Write data to sheet
    const range = sheet.getRange(1, 1, data.length, data[0].length);
    range.setValues(data);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, data[0].length);
    
    console.log(`📝 Written ${data.length} rows to target sheet`);
  } catch (error) {
    console.error('❌ Error writing data to target:', error.message);
    throw error;
  }
}

/**
 * Test connection to source spreadsheet
 * @returns {Object} Connection test results
 */
function testConnection() {
  try {
    const data = readSourceData();
    return {
      success: true,
      message: `Successfully connected to source spreadsheet. Found ${data.length} rows.`,
      rowCount: data.length,
      columnCount: data[0] ? data[0].length : 0
    };
  } catch (error) {
    return {
      success: false,
      message: `Connection failed: ${error.message}`,
      error: error.message
    };
  }
}

/**
 * Template function for data processing
 * Customize this function based on your specific needs
 * @param {Array} rawData - Raw data from source sheet
 * @returns {Array} Processed data
 */
function processData(rawData) {
  // TODO: Implement your specific data processing logic here
  // This is a template - customize based on your needs
  
  const processedData = [];
  
  // Add headers (customize based on your data structure)
  processedData.push(['Column 1', 'Column 2', 'Column 3']);
  
  // Process each row (skip header)
  for (let i = 1; i < rawData.length; i++) {
    const row = rawData[i];
    
    // TODO: Add your processing logic here
    // Example: processedData.push([row[0], row[1], row[2]]);
  }
  
  console.log(`📊 Processed ${processedData.length - 1} records`);
  return processedData;
}

/**
 * Main function to run the data processing pipeline
 * Customize this function based on your specific workflow
 */
function runDataProcessing() {
  try {
    console.log('🚀 Starting data processing...');
    
    // Read raw data
    const rawData = readSourceData();
    
    // Clean target sheet
    cleanTargetSheet();
    
    // Process data (customize this function)
    const processedData = processData(rawData);
    
    // Write to target sheet
    writeDataToTarget(processedData);
    
    console.log('✅ Data processing completed successfully!');
    
    return {
      success: true,
      processedRecords: processedData.length - 1,
      sourceRecords: rawData.length - 1
    };
  } catch (error) {
    console.error('❌ Error in data processing:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}