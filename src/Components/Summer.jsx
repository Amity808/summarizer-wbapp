import React from 'react'
import { useEffect, useState } from 'react'
import { RxCopy, RxCheck } from 'react-icons/rx'
import { useLazyGetSummaryQuery } from '../services/article'
import { VscLoading } from 'react-icons/vsc'
import loader from '../assets/loader.svg'

const Summer = () => {
  const [article, setarticle] = useState({
    url: "",
    summary: "",
  })
  const [allArticle, setallArticle] = useState([])
  const [copied, setCopied] = useState("")

  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articleFromLocalStorage = JSON.parse(localStorage.getItem('article'))

    if(articleFromLocalStorage) {
      setallArticle(articleFromLocalStorage)
    }
  
    
  }, [])
  

  const handleSumit = async (e) => {
    e.preventDefault();
    const {data} = await getSummary({ articleUrl: article.url})

    // we have to check if we get anything fromthe link
    if (data?.summary) {
      const newArticle = {...article, summary: data.summary}
      
      const updatedAllArticle = [newArticle, ...allArticle]
      setarticle(newArticle);
      setallArticle(updatedAllArticle);
      localStorage.setItem('article', JSON.stringify(updatedAllArticle));
      console.log(newArticle);
    }
    
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => setCopied(false), 3000)
  
  }
  return (
    <div className=' flex justify-center items-center flex-col'>
      <div>
        <form action="" onSubmit={handleSumit} className='flex items-center max-sm:flex-col max-md:justify-center max-sm:items-center'>
      
        <div className='max-sm:mb-6'>
        <RxCopy size={27} color='#0000ea' className=' absolute my-2 ml-3 w-5' />
        {/* <input type="text" name="summer"placeholder='Enter Your Link' id="summered" className=' w-full h-16 rounded-e-full p-8' /> */}
        <input type="url" name="urllink" 
        placeholder='Enter a Url' 
        id="linksummer" required value={article.url} onChange={(e) => {setarticle({...article, url: e.target.value})}} className='pl-10 w-96 h-16 rounded-e-full p-8 text-black shadow-2xl peer max-sm:w-48 '/>
        
        </div>
        <button type="submit" className=' pr-5 border-2 pl-5 pt-2 pb-2 rounded-full ml-6  hover:bg-blue-950/60 cursor-pointer peer-focus:border-gray-700 peer-focus:text-pink-700 max-sm:text-sm'>Summerize</button>
        </form>
         {/* browse url history */}
         
      </div>
      <div className='flex flex-col gap-1 max-h-60 overflow-y-auto mt-7'>
      {allArticle.map((item, index) => (
        <div key={`link-${index}`} className=' bg-pink-500/50 rounded-xl' onClick={() => setarticle(item)}>
          <div className='copy_btn' onClick={() => handleCopy(item.url)}>
          {copied === item.url ? 
          <RxCheck size={27} color='#0000ea' className='absolute my-2 ml-3 w-5' /> 
          : <RxCopy size={27} color='#0000ea' className='absolute my-2 ml-3 w-5' />}
          </div>
          <p className=' p-7 '>{item.url}</p>
        </div>
      ))}
      </div>
     
     {/* Display Result */}
     <div className='my-10 max-w-full flex justify-center items-center'>
        {
          isFetching ? (
            <img src={loader} alt='loader' className='w-28 h-20 object-contain' />
          ) : error ? (
            <p className='font-bold text-red-600  text-center'>Try reload the page
          <br />
          <span className='font-bold text-red-500'>
            {error?.data?.error}
          </span>
          </p>
          ) : (
            article.summary && (
              <div className='flex flex-col gap-3'>
                <h2 className=' font-satoshi font-bold text-lg text-center '>
                  Article <span className=' text-white'>Summary</span>
                </h2>
                <div className=' bg-pink-500/50 p-5'>
                  <p className=' text-base'>{article.summary}</p>
                </div>
              </div>
            )
          )}
     </div>


    </div>
  )
}

export default Summer
