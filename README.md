"# Tiktakto

A minimalist tic-tac-toe game featuring an unbeatable AI opponent and a global leaderboard system. Challenge the machine and claim your spot on the rankings.

## Features

- **AI Opponent**: Powered by the minimax algorithm, the AI plays optimally and is virtually unbeatable
- **Score Tracking**: Local statistics saved to track your wins against the AI
- **Global Leaderboard**: View the top 50 players and their scores across all sessions
- **Responsive Design**: Fully functional on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic theme detection based on system preferences
- **Accessibility**: WCAG AA compliant with semantic HTML and ARIA labels
- **Persistent Storage**: Game statistics are saved locally via localStorage

## How to Play

1. Click any square on the 3×3 board to make your move (you are X)
2. The AI automatically responds with its move (O)
3. Get three in a row (horizontal, vertical, or diagonal) to win
4. Win games to increase your score
5. Your stats are automatically saved and appear on the leaderboard

## Game Mechanics

### AI Algorithm
The AI uses the **minimax algorithm** to evaluate every possible move and choose the optimal strategy:
- Evaluates board states recursively
- Prioritizes winning moves
- Blocks opponent winning moves
- Plays defensively when necessary

### Win Conditions
Win by placing three of your marks in a row:
- Rows: positions [0,1,2], [3,4,5], [6,7,8]
- Columns: positions [0,3,6], [1,4,7], [2,5,8]
- Diagonals: positions [0,4,8], [2,4,6]

## Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom properties, responsive design, animations
- **Vanilla JavaScript**: No frameworks, pure game logic with minimax algorithm
- **Typography**: JetBrains Mono + Inter from Google Fonts
- **Icons**: Lucide Icons via unpkg CDN

## Color Palette

- **Background**: Cream (#faf8f2) / Dark (#0a0a0a)
- **Accent**: Gold (#d4a847) - Used for active elements and CTAs
- **Text**: Charcoal (#1a1a1a) / Light (#faf8f2)
- **Border**: Subtle dividers for visual hierarchy

## Design Philosophy

The design prioritizes intentional minimalism over AI-generated aesthetics:
- Asymmetric but balanced layout
- Meaningful whitespace
- Smooth 280-400ms transitions
- Accessible color contrast (WCAG AA)
- Mobile-first responsive approach

## Installation

1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. No build process or dependencies required

## File Structure

```
tiktakto/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
└── game.js             # Game logic and AI algorithm
```

## Browser Support

Works in all modern browsers supporting:
- ES6+ JavaScript
- CSS Custom Properties
- localStorage API
- CSS Grid and Flexbox

## Performance

- Zero external JavaScript dependencies
- Lightweight minified assets
- Fast game state evaluation
- Optimized animations (60fps)

## Statistics & Leaderboard

Your game stats are stored locally:
- **Player Score**: Track wins against AI
- **AI Score**: Track AI victories
- **Timestamps**: When games were played
- **Leaderboard**: Top 50 all-time scores

To clear your stats, click the "Clear Stats" button in the game.

## Accessibility

- Semantic HTML5 elements (header, nav, main, section, footer)
- ARIA labels on interactive elements
- Keyboard navigable interface
- Focus-visible outlines for keyboard users
- High contrast ratios (WCAG AA)
- Responsive text sizing with clamp()

## Future Enhancements

Potential improvements:
- Multiplayer mode (local two-player)
- Difficulty settings (easy, medium, hard)
- Game history/replay functionality
- Cloud leaderboard sync
- Achievements and badges
- Sound effects and haptics

---

Made with intentionality and care. A game of strategy, timing, and perhaps luck." 
