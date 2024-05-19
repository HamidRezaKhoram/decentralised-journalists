"use client";
import { IoIosSearch } from 'react-icons/io';
import { ImSpinner9 } from 'react-icons/im';
import { RxCross1 } from 'react-icons/rx';

import { useEffect, useState } from 'react';
import NewArticle from '@/components/newArticle';
import Hero from '@/components/hero';
import ArticlePreview from '@/components/articlePreview';
import CustomHr from '@/components/customHr';

function getIdFromObject(obj) {
  let res = [];
  for (let i = 0; i < obj.length; i++) {
    res.push(obj[i].id);
  }
  return res;
}

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [searchError, setSearchError] = useState(false);

  const [searched, setSearched] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await fetch("https://us-east-2.aws.neurelo.com/rest/blockchain_story",
          {
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            }
          }
        );
        const fetchedArticles = await data.json();
        const articleData = await fetchedArticles.data;
        setArticles(articleData);
      } catch (error) {
        console.log(`Error fetching articles: ${error}`);
      }
    }
    fetchArticles();
  }, []);

  async function handleSearch(e) {
    e.preventDefault();

    // Trim spaces and check the length
    const trimmedQuery = query.replace(/\s/g, '');

    if (trimmedQuery.length < 3) {
      setSearchError(true);
      setIsLoading(false);
      setTimeout(() => { setSearchError(false) }, 5000);
      return;
    }

    try {
      const response = await fetch(`https://us-east-2.aws.neurelo.com/custom/search?query1=%25${query}%25&query2=%25${query}%25`, {
        method: 'GET',
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        }
      });
      const searchResults = await response.json();
      const idArr = getIdFromObject(searchResults.data);

      setFilteredArticles(articles.filter(article => idArr.includes(article.id)));
      setSearched(true);
    }
    catch (error) {
      console.log(`Error fetching search results: ${error}`);
    }

    setIsLoading(false);
  }

  return (
    <>
      <main className=''>
        <Hero />

        <section className='flex flex-col items-center justify-center'>
          <h4 className='my-1 text-4xl font-semibold py-2'>Search</h4>
          <div className='flex flex-col items-center justify-center w-full'>
            <form id="searchForm" onSubmit={handleSearch} className='w-full flex justify-center items-center'>
              <input
                id='query'
                name='query'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { setIsLoading(true); handleSearch(e); } }}
                type='text'
                placeholder='Search for articles...'
                className='w-3/4 md:w-2/3 lg:w-1/2 py-2 px-2.5 my-2 border-2 border-gray-700 rounded-md'
              />
              <button type='submit' className='bg-black rounded-md py-2.5 px-2.5 border-gray-700 ml-[-40px]'>
                <IoIosSearch className={`${isLoading && 'hidden'} text-white`} />
                <ImSpinner9 className={`${!isLoading && 'hidden'} animate-spin text-white`} />
              </button>
            </form>
            {searchError && <p className='text-red-500 text-sm italic'>**Query must be at least 3 characters long (excluding spaces).**</p>}
          </div>

        </section>

        <section>
          {searched &&
            <div className='w-full flex items-center justify-center'>
              <button
                className='flex flex-row justify-center items-center bg-gray-950 text-white rounded-md shadow-sm px-3 py-2 hover:scale-105'
                onClick={() => {
                  setSearched(false);
                  setQuery('');
                }}
              >
                <p>
                  Clear Search Results
                </p>
                <RxCross1 className='w-5 h-5 ml-1' />
              </button>
            </div>

          }
          {
            searched &&
            <>
              <h4 className='my-1 text-2xl lg:text-4xl font-semibold pb-2 pt-8 flex justify-center'>Search Results</h4>
              <CustomHr />
              {filteredArticles.map((article, index) => {
                return (
                  <ArticlePreview key={index} article={article} />
                );
              })}
            </>
          }
          {
            searched && filteredArticles.length === 0 &&
            <h4 className='my-1 text-2xl lg:text-4xl font-semibold pb-2 pt-8 flex justify-center'>No results found . . .</h4>
          }
          {
            !searched &&
            <>
              <h4 className='my-1 text-2xl lg:text-4xl font-semibold pb-2 pt-8 flex justify-center'>All Articles</h4>
              <CustomHr />
              {articles.map((article, index) => {
                return (
                  <ArticlePreview key={index} article={article} />
                );
              })}
            </>
          }
        </section>
      </main >
      <NewArticle />
    </>
  );
}