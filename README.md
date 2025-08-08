# Timeline Component

A modern and interactive React component for visualizing items in a horizontal timeline, featuring advanced zoom, drag & drop, and inline editing capabilities.

## 🚀 Features

### Interactive Timeline

- **Drag & Drop**: Move items between lanes seamlessly
- **Zoom**: Scroll to zoom (3.7x - 32x) with smooth transitions
- **Pan**: Click and drag to navigate through the timeline
- **Inline Editing**: Click on item names to edit them directly

### Dark Mode

- **Toggle**: Easy switch between light and dark themes
- **Smooth Transitions**: Beautiful animations between modes
- **User Preference**: Respects system dark mode settings

### Responsive Design

- **Mobile Optimized**: Works great on small screens
- **Desktop Enhanced**: Full features on larger displays
- **Performance**: Efficient rendering and smooth interactions

## 🛠️ Technologies

- **React 18**: Modern hooks and features
- **CSS3**: Advanced styling and animations
- **JavaScript ES6+**: Modern syntax
- **Parcel**: Fast and simple bundler

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run in development
npm start

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── TimelineItem.jsx
│   ├── TimelineHeader.jsx
│   ├── Timeline.jsx
│   └── DarkModeToggle.jsx
├── hooks/              # Custom hooks for business logic
│   ├── useTimelineDrag.js
│   ├── useTimelinePan.js
│   └── useTimelineZoom.js
├── utils/              # Utilities and constants
│   └── timelineUtils.js
├── index.js            # Main component
├── app.css             # Styles
└── timelineItems.js    # Sample data
```

## 🎯 What I Like About My Implementation

### Dark Mode Experience

I really enjoyed implementing the dark mode feature - it's something I use daily and I wanted to create a seamless experience. The harmonic colors bring peace and create a clean interface without distractions, perfect for organizing routines.

### User Interface Design

I focused heavily on user experience and ease of use, thinking of this as an app that real users would actually use. The interface is clean and intuitive, making it easy to change event dates and manage timelines.

### Color Harmony

The color scheme creates a peaceful and organized feeling, with smooth transitions that make the interface feel polished and professional.

## 🔄 What I Would Change

### Enhanced Timeline Features

If I had more time, I would add:

- **Daily markers**: Show individual days within each month for better granularity
- **Calendar picker**: Allow users to navigate to different years and view historical/future timelines
- **Multiple timelines**: Support for different timeline views and projects

### Mobile Optimization

I would focus more on mobile logic and testing:

- **Mobile testing**: More thorough testing on mobile devices
- **Touch interactions**: Better touch gestures and mobile-specific features
- **Responsive breakpoints**: More refined mobile experience

### Testing & Performance

- **Load testing**: Test with more events and shorter time periods
- **Mobile testing**: Comprehensive mobile device testing
- **SEO optimization**: Better search engine optimization
- **Performance testing**: Test with larger datasets

## 🎨 Design Decisions & Inspiration

### Google Calendar Influence

My main inspiration came from Google Calendar's timeline view. I studied their interface patterns and adapted them for this project, focusing on:

- Clean, distraction-free design
- Intuitive drag and drop interactions
- Smooth zoom and pan functionality
- Clear visual hierarchy

### VIS.js Timeline Reference

I also drew inspiration from the [VIS.js Timeline](https://visjs.github.io/vis-timeline/examples/timeline/basicUsage.html) for some functionality ideas, particularly:

- Timeline navigation patterns
- Item selection and interaction models
- Zoom and pan behavior

### User-Centric Approach

I designed this as if it were a real app that users would depend on daily. This influenced my decisions around:

- **Accessibility**: Easy to use for all users
- **Performance**: Smooth interactions even with many items
- **Reliability**: Robust error handling and edge cases
- **Intuitiveness**: Natural interactions that users expect

## 🧪 Testing Strategy

If I had more time, I would implement:

### Unit Testing

```javascript
// Example test structure
describe("Timeline Component", () => {
  test("should render items correctly");
  test("should handle drag and drop");
  test("should update zoom levels");
  test("should toggle dark mode");
});
```

### Integration Testing

- **Drag & Drop**: Test moving items between different positions
- **Zoom Behavior**: Test zoom limits and smooth transitions
- **Data Persistence**: Test saving and loading timeline data
- **Cross-browser**: Test on different browsers and devices

### Performance Testing

- **Load Testing**: Test with 100+ timeline items
- **Mobile Performance**: Test on various mobile devices
- **Memory Usage**: Monitor for memory leaks
- **Rendering Performance**: Ensure smooth 60fps interactions

### User Testing

- **Usability Testing**: Real user feedback on interactions
- **Accessibility Testing**: Screen reader compatibility
- **Mobile Testing**: Touch interaction testing
- **Edge Cases**: Test with unusual data scenarios

## 📊 Architecture

### Components

- **`TimelineItem`**: Individual timeline items
- **`TimelineHeader`**: Header with controls
- **`Timeline`**: Main container
- **`DarkModeToggle`**: Theme toggle

### Custom Hooks

- **`useTimelineDrag`**: Manages drag & drop
- **`useTimelinePan`**: Handles panning
- **`useTimelineZoom`**: Manages zoom and scroll

### Utilities

- **`timelineUtils.js`**: Utility functions and constants
- **Centralized config**: TIMELINE_CONFIG
- **Reusable functions**: Position calculations, colors, etc.

## 🎨 Styling

### Organized CSS

- **Variables**: Centralized colors and dimensions
- **Dark Mode**: Specific styles for dark theme
- **Transitions**: Smooth animations
- **Responsive**: Media queries for different screens

## 📈 Performance

### Optimizations

- **Memoization**: Optimized components
- **Event Delegation**: Efficient event handling
- **Lazy Loading**: On-demand loading
- **Cleanup**: Proper event listener cleanup

## ✅ Benefits

### Maintainability

- Organized and readable code
- Easy to debug and test
- Isolated components

### Scalability

- Easy to add new features
- Reusable components
- Extensible architecture

### Performance

- Optimized rendering
- Efficient event handling
- Proper memory management

---

**Timeline Component** - Clean, maintainable, and scalable code! 🚀
