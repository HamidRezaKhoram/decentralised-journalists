import { FaPlus } from "react-icons/fa6";

export default function NewArticle() {
    return (
        <button 
            className="bg-gray-950 text-white w-8 h-8 md:w-12 md:h-12 rounded-sm md:rounded-md fixed bottom-14 right-2 md:bottom-16 md:right-4 flex justify-center items-center ease-in-out duration-300 hover:bg-transparent hover:border border-gray-950 hover:scale-105"
        >
            <FaPlus className="w-full h-full p-1 text-xl md:text-3xl hover:text-gray-950" />
        </button>
    );
}

// <div className='flex flex-col items-center justify-center'>
//     <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl'>Submit an Article</h1>
//     <form className='flex flex-col items-center justify-center'>
//         <label htmlFor='title'>Title</label>
//         <input type='text' id='title' name='title' />
//         <label htmlFor='author'>Author</label>
//         <input type='text' id='author' name='author' />
//         <label htmlFor='content'>Content</label>
//         <textarea id='content' name='content' />
//         <button type='submit'>Submit</button>
//     </form>
// </div>