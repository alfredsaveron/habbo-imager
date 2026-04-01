# React Habbo Imager

A interactive, client-side React component to generate, fetch, and customize Habbo Avatars. This project handles dynamic connections to the official `habbo.com` imaging API out-of-the-box.

<img src="/images/1raw.png" alt="readme-image" width="1000"/>

## Features

- **Click Copy:** Copy the generated direct image URL instantly.
- **Save to Device:** Native cross-origin fetch Blob functionality to download generated avatars.

## Installation

1. Make sure you have `lucide-react` installed in your project for icons:
   ```bash
   npm install lucide-react
   ```
2. Copy `HabboImager.tsx` and `HabboImager.module.css` into your project's `components` directory.
3. Import the component anywhere:
   ```jsx
   import HabboImager from '@/components/HabboImager';

   function App() {
     return <HabboImager />
   }
   export default App;
   ```
