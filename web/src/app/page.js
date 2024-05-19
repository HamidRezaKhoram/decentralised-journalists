"use client";
import Image from 'next/image';
import { IoIosSearch } from 'react-icons/io'
import { useEffect, useState } from 'react';
import search from '@/actions/search'

function toTitleCase(str) {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
    return match.toUpperCase();
  });
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  return (
    <main className=''>
      <section
        id='home'
        className={`main pt-5 pb-4 center flex-col items-center justify-center h-screen transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl'>Decentralised Journalists</h1>
        <Image
          src={`/logo-globe.png`}
          alt="Globe Logo for Decentralised Journalists"
          width={1000}
          height={1000}
          className="w-[90%] md:w-[50%] lg:w-[30%] d-inline-block align-text-top"
          priority={true}
        />
        <p className='my-1 text-lg lg:text-xl'>Shielded and Secure Journalism</p>
      </section>

      <hr className="border-0 h-0.5 my-4 w-full mx-auto bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

      <section className='flex flex-col items-center justify-center'>
        <h4 className='my-1 text-4xl font-semibold py-2'>Search</h4>
        <div className='flex flex-row items-center justify-center w-full'>
          <form action={search} className='w-full flex justify-center items-center'>
            <input
              id='query'
              name='query'
              type='text'
              placeholder='Search for articles...'
              className='w-3/4 md:w-2/3 lg:w-1/2 py-2 px-2.5 my-2 border-2 border-gray-700 rounded-md'
            />
            <button type='submit' className='bg-black rounded-md py-2.5 px-2.5 border-gray-700 ml-[-40px]'>
              <IoIosSearch className='text-white' />
            </button>
          </form>
        </div>

      </section>
      <section>
        <hr className='mt-4 bg-gray-300 w-3/4 md:w-2/3 mx-auto' />
        {
          articles.map((article, index) => {
            return (
              <div key={index} className='flex flex-col w-3/4 md:w-2/3 mx-auto border-b-2 border-gray-300 px-4 py-2 justify-center'>
                <div className='flex flex-row justify-between items-center'>
                  <h4 className='my-1 text-3xl lg:text-4xl font-semibold py-2 pb-2'>{toTitleCase(article.title)}</h4>
                  <p className='my-1 md:text-lg lg:text-xl pb-2'>Author: {article.author_id}</p>
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
  );
}