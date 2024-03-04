import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals.js';

import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import Root from './routes/root.js';
import Login from "./page/Login/Login.js";
import SearchProfile from './page/Search/SearchProfile.js';
import Profile from './page/ProfileOutputWeb/profileOutput.js';

import Personal from './page/Personal/Personal.js';
import EditPersonal from './page/Personal/Edit/m-ProfileEdit.js';


import EducationBackground from './page/EducationBackground/EducationBackground.js';
import EditEducationBackground from './page/EducationBackground/EditEduBackground/m-info2.js'
import AuthWrapper from './components/Auth/AuthWrapper.js';
import Home from './page/Home/Home.js';
import NotFoundPage from './page/NotFoundpage/404.js';

import EducationEdit1 from './page/EducationBackground/EducationEdit1.js';
import PerformancePro from './page/PerformancePro/PerformancePro.js';
import PerformanceEdit1 from './page/PerformancePro/PerformanceEdit1.js';
import AddEducationBackground from './page/EducationBackground/InsertEducationBackground/AddEdu.js';

import JournalPage from './page/Journal/Journal.js';
import JournalEdit from './page/Journal/Edit/JournalEdit.js';
import JournalSelect from './page/Journal/Edit/JournalSelect.js';
import AddJournal from './page/Journal/Insert/JournalInsert.js';
import SummaryProfile from './page/SummaryPage/SummaryPage.js';

import CV from './components/getCV/CV.js';

import SearchBar from './page/Search/SearchBar.js';



import { ImageProvider } from './components/imageContext/imageContext.js';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [ {
      path: "/Login",
      element: <Login />
    }, {
      path: "/Personal",
      element: <Personal />
    },{
      path: "/Personal/Edit",
      element: <EditPersonal />
    }, {
      path: "/EducationBackground",
      element: <EducationBackground />,
    }, {
      path: "/EducationEdit",
      element: <EducationEdit1 />,
    }, {
      path: "/PerformancePro",
      element: <PerformancePro />
    }, {
      path: "/PerformanceEdit1",
      element: <PerformanceEdit1 />,
    }, {
      path: "/EducationBackground/Edit",
      element: <EditEducationBackground />
    }, {
      path: "/EducationBackground/Add",
      element: <AddEducationBackground />
    },{
      path : "/Journal",
      element: <JournalPage />
    },{
      path : "/Journal/Edit",
      element: <JournalEdit />
    },{
      path : "/JournalSelect",
      element: <JournalSelect />
    },{
      path: "/Journal/Add",
      element: <AddJournal />
    },{
      path: "/SearchProfile",
      element: <SearchProfile />
    },{
      path: "/Summary",
      element: <SummaryProfile />
    }

    ]
    
  },
  {
    path: "/home",
    element: <Home />
  },{
    path: "/getCV",
    element: <CV />
  }
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <AuthWrapper>
      <ImageProvider>
        
        <RouterProvider router={router} />
        
      </ImageProvider>
    </AuthWrapper>,
  </React.StrictMode>

);

reportWebVitals();