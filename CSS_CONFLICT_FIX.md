# Production Fix for CSS Conflicts

## The Problem
In Module Federation, the Host application's global CSS often bleeds into Remote components.
Currently, the Host defines a global `.bg-red-500` rule (setting it to **blue**) which overrides the Remote's Tailwind class `.bg-red-500`.

## The Recommended Solution: Tailwind Prefixing
For production, we recommend **namespacing** the Remote's CSS to avoid collisions completely.

### Steps to Implement

1.  **Configure Tailwind Prefix**
    Open `remote/tailwind.config.js` and add a prefix:
    ```javascript
    module.exports = {
      prefix: 'rem-', // All classes will now start with 'rem-'
      content: ["./src/**/*.{js,jsx,ts,tsx}"],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

2.  **Update Component Class Names**
    Update your Remote components to use the new prefix.
    
    *Example (`remote/src/Button.tsx`):*
    ```tsx
    // Before
    <button className="bg-red-500 text-white ...">
    
    // After
    <button className="rem-bg-red-500 rem-text-white ...">
    ```

### Why this is better than "Scoped CSS"
*   **Explicit**: It is immediately obvious which styles belong to the Remote.
*   **Robust**: It does not rely on fragile "specificity" wars (e.g., trying to use `!important` or ID selectors to beat the Host).
*   **Debuggable**: In the DevTools, you will clearly see `.rem-bg-red-500` applied, ensuring no confusion with Host styles.
