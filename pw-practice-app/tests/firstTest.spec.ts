import {test, expect} from '@playwright/test'

//test
//test.beforeAll() // hay bta3moul execute abel kel chi
//test.afterAll() // hay bta3moul execute baed kel chi

//test.afterEach // script after every test
//script before every test
test.beforeEach(async({page}) => {
    await page.goto("/") //btekhoud l baseurl yalli bel playwright config
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

})
/*
test.describe('suite1',() =>{
    //hay bas btetaba2 3al testet li b nafs l suite1
    test.beforeEach(async({page}) => {
        await page.getByText('Charts').click()
    
    })
    test('FirstTest', async({page}) => {
        await page.getByText('Form Layouts').click()
    })
    
    test('SecondTest', async({page}) => {
        await page.getByText('Datepicker').click()
    })

})

test.describe('suite2',() =>{
    //hay bas btetaba2 3al testet li b nafs l suite2
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    
    })
    test('FirstTest', async({page}) => {
        await page.getByText('Form Layouts').click()
    })
    
    test('SecondTest', async({page}) => {
        await page.getByText('Datepicker').click()
    })

})
*/
// test('Locator Syntax Rules', async({page}) => {
//     //by Tag Name
//     await page.locator('input').first().click()

//         //by id
//         page.locator('#inputEmail1')

//             //by Class value
//     page.locator('.shape-rectangle')

//         //by Attribute
//         page.locator('[placeholder="Email"]')
//     //combine different selectors
//     page.locator('input[placeholder="Email"]')

//     //by xpath(NOT RECOMMENDED)
//     page.locator('//*[@id="inputEmail1"]')

//     //by partial text match
//     page.locator(':text("Using")')
//     //by exact test match
//     page.locator(':text-is("Using the Grid")')
// })


// test('User facing Roles', async({page}) => {
// await page.getByRole('textbox',{name:"Email"}).first().click()
// await page.getByRole('button',{name:"Sign in"}).first().click()
// await page.getByLabel('Email').first().click()
// await page.getByPlaceholder('Jane Doe').first().click()
// await page.getByText('Using the Grid').first().click()
// //await page.getByTestId('SignIn').first().click()
// await page.getByTitle('IoT Dashboard').first().click()

// })



test('locating child elements', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').getByRole('button',{name:"Sign in"}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click()//index ra2em 3 ya3ne rabi3 element la2eno l index bibalich men 0
    })

    test('locating parent elements', async({page}) => {
        await page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:"Email"}).click()
        await page.locator('nb-card',{has:page.locator('#inputEmail1')}).getByRole('textbox',{name:"Email"}).click()
        await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox',{name:"Email"}).click()
        await page.locator('nb-card').filter({has:page.locator('.status-danger')}).getByRole('textbox',{name:"Password"}).click()
        await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:"Sign in"})
        .getByRole('textbox',{name:"Email"}).click()
     })
    

     test('Reussing the locators', async({page}) => {
        const basicform= page.locator('nb-card').filter({hasText:"Basic form"})
        const emailField=basicform.getByRole('textbox',{name:"Email"})
        await emailField.fill('test@test.com')
        await basicform.getByRole('textbox',{name:"Password"}).fill('Welcome@123')
        await basicform.locator('nb-checkbox').click()
        await basicform.getByRole('button').click()

        await expect(emailField).toHaveValue('test@test.com')
     })
    
     test('extracting values', async({page}) => {
//single test value
const basicform= page.locator('nb-card').filter({hasText:"Basic form"})
const buttontext= await basicform.locator('button').textContent()
expect(buttontext).toEqual('Submit')
//all text values
const allRadioButtons = await page.locator('nb-radio').allTextContents()
expect (allRadioButtons).toContain('Option 1')

//input vaue
const emailField = basicform.getByRole('textbox',{name:"Email"})
await emailField.fill('test@test.com')
const emailvalue= await emailField.inputValue()
expect(emailvalue).toEqual('test@test.com')

//attributes
const placeholderValue=await emailField.getAttribute('placeholder')
expect (placeholderValue).toEqual('Email')
     })




     test('asseritions', async({page}) => {
        const basicformButton= page.locator('nb-card').filter({hasText:"Basic form"}).locator('button')
        //general assertions
        const value = 5
        expect(value).toEqual(5)
        const text= await basicformButton.textContent()
        expect (text).toEqual('Submit')
        //Locator assertions
        await expect(basicformButton).toHaveText('Submit')//locator men hateloun await bel awal

        //Soft assertion
        await expect.soft(basicformButton).toHaveText('Submit') // eza men hat soft l test bikafe law bajjit 
        await basicformButton.click()
             })    
     