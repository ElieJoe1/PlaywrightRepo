import { request,expect } from '@playwright/test'; 
import user from '../pw-apitest-app/.auth/user.json'
import fs from 'fs'

 async function globalSetup() {
    const authFile='.auth/user.json'
    const context = await request.newContext();

    const responseToken = await context.post('https://conduit-api.bondaracademy.com/api/users/login',{
        data: {
            user: {email: "eliejoeabdelnour@hotmail.com", password: "Lallousa@!"}
        }
        })
    const responseBody = await responseToken.json()
    const accessToken = responseBody.user.token
    user.origins[0].localStorage[0].value=accessToken
    fs.writeFileSync(authFile,JSON.stringify(user))
    process.env['ACCESS_TOKEN']=accessToken
    const articleresponse = await context.post('https://conduit-api.bondaracademy.com/api/articles/',{
        data: {
            article:{title: "Global Likes test article1", description: "This is a Description", body: "This is a body"}
        },
        headers:{ Authorization:`Token ${process.env.ACCESS_TOKEN}` }
        })
    expect (articleresponse.status()).toEqual(201)
    const response = await articleresponse.json()
    const slugId=response.article.slug
    process.env['SLUGID']=slugId
}
export default globalSetup;