import {test as base} from '@playwright/test'
import {PageManager} from '../pw-practice-app/page-objects/pageManager'

export type TestOptions={
    globalsQaUrl:string
    formLayoutsPage : string
    pageManager : PageManager
}

export const test = base.extend<TestOptions>({
    globalsQaUrl:['',{option:true}],
    // formLayoutsPage: [async ({page},use)=> {
    //     await page.goto("/")
    //     await page.getByText('Forms').click()
    //     await page.getByText('Form Layouts').click()
    //     await use('') //hay kermel ne2dar nesta3mela
    // },{auto:true}],
    // pageManager : async ({page},use)=> {
    //     const pm = new PageManager(page) 
    //     await use(pm)
    // }


    formLayoutsPage: async ({page},use)=> {
        console.log('hello1')
        await page.goto("/")
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('') //hay kermel ne2dar nesta3mela
        console.log('tear down') // kel chi ba3ed l use bikoun abel l test w kel chi abel l use bikoun abel ma ybalich l test
    },

    pageManager : async ({page,formLayoutsPage},use)=> {
        console.log('hello')
        const pm = new PageManager(page) 
        await use(pm)
    }

})