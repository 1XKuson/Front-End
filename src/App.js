import React, { useEffect, useState } from 'react';
import "./App.css";
import Login from "./page/Login/Login.js";
import Root from './routes/root.js';
function App() {
  return (
    <div>
      <Root />
      <Outlet />
    </div>
  );
}

export default App;