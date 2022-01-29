import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

let quoteURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App()
{
  const [quote, setQuote] = useState("This is just the beginning.")
  const [author, setAuthor] = useState("Some Guy")

  const [randomNumber, setRandomNumber] = useState(0)
  const [quotesArray, setQuotesArray] = useState(null)

  const fetchQuotes = async (url) =>
  {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }

  useEffect(() =>
  {
    fetchQuotes(quoteURL)
  }, [quoteURL])

  const getRandomQuote = () =>
  {
    let randomInt = Math.floor(quotesArray.length * Math.random())
    console.log(randomInt)
    setRandomNumber(randomInt)
    setQuote(quotesArray[randomInt].quote)
    setAuthor(quotesArray[randomInt].author)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div id="quote-box" className="main_content_block">
          <div className="quote_text_block">
            <p id="text" >
              {quote}
            </p>
          </div>
          <div className="quote_author_block">
            <p id="author" className="quote_author">
              - {author}
            </p>
          </div>
          <div className="button_block">
            <button id="new-quote" onClick={() => getRandomQuote()} className="new_quote_button">
              New Quote
            </button>
            <a id="tweet-quote" href={encodeURI(`https://twitter.com/intent/tweet?text=${quote} -${author}`)} className="tweet_button">
              <FontAwesomeIcon icon={faTwitter} className="twitterIcon"/>
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;