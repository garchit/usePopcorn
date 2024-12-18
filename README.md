# UsePopcorn

**UsePopcorn** is a React-based project that fetches movie details from the IMDb API and displays them in an intuitive and user-friendly interface. The application allows users to explore movie information such as title, plot, actors, ratings, and more.

---

## Features

- **Fetch Movie Details**: Retrieves detailed movie information from the IMDb API, including title, plot, actors, genres, ratings, and more.
- **Dynamic UI**: Responsive and visually appealing user interface built with React.
- **Search Functionality**: Search for movies using keywords and view their detailed information.
- **Interactive Components**: Expandable sections for movie details and summaries.
- **Conditional Rendering**: Shows detailed movie information or a summary list based on user interaction.

---

## Installation

Follow these steps to set up and run the project on your local machine:

### Prerequisites
- Node.js (>=14.0.0)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/usepopcorn.git
   cd usepopcorn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. Create an `.env` file in the root directory and add your IMDb API key:
   ```env
   REACT_APP_IMDB_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

---

## Usage

1. Enter a movie name or keyword in the search bar.
2. Browse the search results and click on a movie to view detailed information.
3. Toggle between summary and detailed views of the selected movie.

---

## File Structure

```
usepopcorn/
├── public/           # Public assets
├── src/
│   ├── App.js        # Main application file containing all components
│   ├── index.js      # Entry point
│   └── styles.css    # CSS styles
├── .env              # Environment variables
├── package.json      # Project dependencies and scripts
├── README.md         # Documentation (this file)
└── ...
```

---

## Dependencies

- **React**: Frontend framework
- **Fetch API**: For making API requests
- **React Icons**: For icons used in the UI
- **dotenv**: For managing environment variables

---

## API Integration

This project integrates with the IMDb API to fetch movie details. Ensure that you have a valid API key and configure it in the `.env` file.

Example API Request:
```javascript
const fetchMovieDetails = async (movieId) => {
  const apiKey = process.env.REACT_APP_IMDB_API_KEY;
  const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`);
  const data = await response.json();
  return data;
};
```

---

## Future Enhancements

- Add user authentication for personalized movie recommendations.
- Enable saving favorite movies to a user profile.
- Implement pagination for large search results.
- Improve UI/UX with additional animations and themes.

---

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests for any improvements or bug fixes.

### Steps to Contribute
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

- IMDb API for providing movie data.
- React.js for the powerful frontend framework.
- All contributors and users who have supported this project.

---

**Happy Coding!**

