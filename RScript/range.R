library(dplyr)
library(mongolite)
library(prophet)
#library(dotenv)

# Load environment variables from .env file
#load_dot_env('C:\\Users\\moham\\Desktop\\evwebapp\\server\\.env')

# Access the URL from the environment
url <- Sys.getenv('MONGO_URI')

# Connect to the MongoDB collection for raw battery data
mongo <- mongo(
  collection = 'batteries',
  url = url
)

# Fetch data from MongoDB
data <- mongo$find()

# Prepare the data
fullRange <- data %>%
  select(date, userId, current_miles)

# Ensure date is in Date format and filter out invalid dates
fullRange$date <- as.Date(fullRange$date, format = '%Y-%m-%d')
fullRange <- fullRange %>% filter(!is.na(date))  # Ensure no missing dates

# Split the data by userId
user_dataframes <- fullRange %>%
  group_split(userId)

# Name each dataframe
names(user_dataframes) <- paste0("dataset", seq_along(user_dataframes))

# Connect to the MongoDB collection for forecasts
mongo_forecast <- mongo(
  collection = 'rangeforecasts',
  url = url
)

# Loop through each dataframe and apply Prophet if new data exists
for (i in seq_along(user_dataframes)) {
  # Get the current userId and the user's data
  current_userId <- unique(user_dataframes[[i]]$userId)
  user_data <- user_dataframes[[i]] %>%
    select(date, current_miles) %>%
    rename(ds = date, y = current_miles)
  
  # Ensure date (ds) column is in the correct format and filter out any NA values
  user_data$ds <- as.Date(user_data$ds, format = '%Y-%m-%d')
  user_data <- user_data %>% filter(!is.na(ds))  # Remove rows with invalid dates

  # Check if a forecast for this userId already exists
  existing_forecast <- mongo_forecast$find(paste0('{"userId": "', current_userId, '"}'), sort = '{"ds": -1}', limit = 1)
  
  if (nrow(existing_forecast) > 0) {
    # Get the latest date in the existing forecast
    latest_forecast_date <- as.Date(existing_forecast$ds[1])
    
    # Check if there is any new data (i.e., more recent than the latest forecast date)
    new_data <- user_data %>%
      filter(ds > latest_forecast_date)
    
    if (nrow(new_data) == 0) {
      message(paste("No new data for userId", current_userId, ". Skipping..."))
      next  # Skip if there's no new data
    }
    
    message(paste("New data detected for userId", current_userId, ". Updating forecast..."))
  } else {
    message(paste("No existing forecast for userId", current_userId, ". Creating new forecast..."))
    new_data <- user_data  # Use all the data if there's no existing forecast
  }
  
  # Fit Prophet model on the new data
  model <- prophet(new_data)
  
  # Create future dataframe for the next 30 days
  future <- make_future_dataframe(model, periods = 30, freq = 'day')
  
  # Forecast
  forecast <- predict(model, future)
  
  # Add the userId back to the forecast dataframe
  forecast$userId <- current_userId
  
  # Select only the columns we need: ds, yhat, and userId
  forecast_filtered <- forecast %>%
    select(ds, yhat, userId)
  
  # Store the filtered forecast in MongoDB
  mongo_forecast$insert(forecast_filtered)
  
  message(paste("Forecast for userId", current_userId, "completed and stored."))
}
