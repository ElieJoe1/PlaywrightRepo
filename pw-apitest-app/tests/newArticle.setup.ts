import { test as setup,expect } from '@playwright/test';

setup('create new article', async ({request}) =>{
    console.log('hello2')
    const articleresponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/',{
        data: {
            article:{title: "Likes test article1", description: "This is a Description", body: "This is a body"}
        }
        })
    expect (articleresponse.status()).toEqual(201)
    const response = await articleresponse.json()
    const slugId=response.article.slug
    process.env['SLUGID']=slugId
}   
)