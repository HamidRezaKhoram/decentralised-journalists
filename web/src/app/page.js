"use client";
import { IoIosSearch } from 'react-icons/io';
import { ImSpinner9 } from 'react-icons/im';

import { useEffect, useState } from 'react';
import NewArticle from '@/components/newArticle';
import Hero from '@/components/hero';

function toTitleCase(str) {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
    return match.toUpperCase();
  });
}

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [searchError, setSearchError] = useState(false);

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
      setTimeout(() => {setSearchError(false)}, 5000);
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
      const arrResults = searchResults.data;
      console.log(arrResults);
    }
    catch {
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
          <hr className='mt-4 bg-gray-300 w-3/4 md:w-2/3 mx-auto' />
          {
            articles.map((article, index) => {
              return (
                <div
                  key={index}
                  className='flex flex-col w-3/4 md:w-2/3 mx-auto border-b-2 border-gray-300 px-4 py-2 justify-center ease-in-out duration-300 hover:bg-gray-950 hover:text-white hover:scale-105 hover:rounded-sm'
                >
                  <div className='flex flex-row justify-between items-center'>
                    <h4 className='my-1 text-2xl lg:text-4xl font-semibold py-2 pb-2'>{toTitleCase(article.title)}</h4>
                    <p className='my-1 text-sm md:text-lg lg:text-xl pb-2'>Author: {article.author_id}</p>
                  </div>
                  <p className='my-1 text-xs lg:text-sm'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit ultricies tortor,
                    vel egestas mauris fringilla id. Fusce at elit ex. Vestibulum non eros fermentum, sagittis
                    dolor a, pharetra lacus...
                  </p>
                </div>
              );
            })
          }
        </section>
      </main >
      <NewArticle />
    </>
  );
}