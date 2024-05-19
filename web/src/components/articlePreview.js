'use client';

function toTitleCase(str) {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
}

export default function ArticlePreview({article}) {
    return (
        <div
            className='flex flex-col w-3/4 md:w-2/3 mx-auto border-b-2 border-gray-300 px-4 py-2 justify-center ease-in-out duration-300 hover:bg-gray-950 hover:text-white hover:scale-105 hover:rounded-sm'
        >
            <div className='flex flex-row justify-between items-center'>
                <h4 className='my-1 text-2xl lg:text-4xl font-semibold py-2 pb-2'>{toTitleCase(article.title)}</h4>
                <div className='flex flex-col justify-center items-center'>
                    <p className='my-1 text-sm md:text-lg lg:text-xl'>{article.author_id}</p>
                    <p className='mb-1 text-xs lg:text-sm pb-2 font-thin'>{article.date_created.substring(0, 10)}</p>
                </div>
            </div>
            <p className='my-1 text-xs lg:text-sm'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit ultricies tortor,
                vel egestas mauris fringilla id. Fusce at elit ex. Vestibulum non eros fermentum, sagittis
                dolor a, pharetra lacus...
            </p>
        </div>
    )
}