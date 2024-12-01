# **Travel Tracker**

Travel tracker is a web application that allows users to track each country they have visited.

---

## **Features**
- Add countries to the list of visited countries using a search input.
- Highlights visited countries on the map.
- Displays the total number of visited countries.

---

## **Technologies Used**
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: HTML, CSS, EJS 

---

## **Setup Instructions**

### 1. **Clone the Repository**
```bash
git clone https://github.com/Valy2255/Travel-Tracker.git
cd Travel-Tracker
```

### 2. **Install Dependencies**
Ensure you have Node.js installed, then run:
```bash
npm install
```

### 3. **Set Up PostgreSQL**
1. Create a PostgreSQL database named `world`:
   ```sql
   CREATE DATABASE world;
   ```
2. Create the necessary tables:
   ```sql
   CREATE TABLE countries (
        id SERIAL PRIMARY KEY,
        country_code VARCHAR(2) UNIQUE NOT NULL,
        country_name VARCHAR(70) NOT NULL
   );

   CREATE TABLE visited_countries (
        id SERIAL PRIMARY KEY,
        country_code VARCHAR(2) NOT NULL
   );
   ```
3. Populate the `countries` table with a list of country codes and names(from the CSV file i uploaded).

### 4. **Configure Database Connection**
Update the `db` configuration in `index.js` with your PostgreSQL credentials:
```javascript
const db = new pg.Client({
  user: "your-username",
  host: "localhost",
  database: "world",
  password: "your-password",
  port: 5432,
});
```

### 5. **Start the Server**
```bash
node index.js
```
The server will run at `http://localhost:3000`.

---

## **Usage**
1. **Add a Country**:
   - Enter the name of a country in the input field and click "Add".
   - If the country exists, it will be highlighted on the map.
   - If the country is already in the list, you'll see an error message.
2. **View Total**:
   - The total number of visited countries is displayed below the map.
