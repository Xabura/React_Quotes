import React, { Suspense } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import AllQuotes from "./pages/AllQuotes";
import SingleQuotes from "./pages/SingleQuote";
import Comments from "./components/comments/Comments";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuotes = React.lazy(() => import("./pages/NewQuote"));

function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="centered"><LoadingSpinner /></div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/quotes" />} />
          <Route path="/quotes" element={<AllQuotes />} />
          <Route path="/quotes/:id" element={<SingleQuotes />}>
            <Route path="/quotes/:id/comments" element={<Comments />} />
          </Route>
          <Route path="/new-quotes" element={<NewQuotes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
