import { Link, Outlet, useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { useEffect } from "react";
import { getSingleQuote } from "../lib/api";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const SingleQuotes = () => {
  const params = useParams();

  const {id} = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  if(status === 'pending'){
    return <div className="centered">
      <LoadingSpinner />
    </div>
  }

  if(error){
    return <p className="centered">{error}</p>
  }

  if(!loadedQuote.text){
    return <p>No Quotes Found!</p>
  }

  return (
    <section>
      <h1>Single Quote</h1>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <div className="centered">
        <Link className="btn--flat" to={`/quotes/${params.id}/comments`}>
          Comments
        </Link>
      </div>
      <Outlet />
    </section>
  );
};

export default SingleQuotes;
