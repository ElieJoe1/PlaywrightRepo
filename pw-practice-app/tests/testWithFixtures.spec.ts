import {expect} from '@playwright/test'
//import {PageManager} from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'
import {test} from '../test-options'


// test('parametrized methods', async({page,formLayoutsPage}) => {

//     const pm = new PageManager(page) 
//     const randomFullName = faker.person.fullName() //betredele esem randomly 
//     const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com` //faker.number.int(1000) betred ra2em randomly men 1 la 1000
//     //await pm.navigateTo().formLayoutsPage()
//     await pm.onFormLayoutsPage().submitUsingTheGridFromWithCredentialsAndSelectOption(process.env.USERNAME,process.env.PASSWORD,'Option 1')
//     await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox(randomFullName,randomEmail,true)
// })


//be ma enno hatayna auto: true bel test-options sar fina nesta3mela bala ma n3ayetla la formlayoutspage
// test('parametrized methods', async({page}) => {

//     const pm = new PageManager(page) 
//     const randomFullName = faker.person.fullName() //betredele esem randomly 
//     const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com` //faker.number.int(1000) betred ra2em randomly men 1 la 1000
//     await pm.onFormLayoutsPage().submitUsingTheGridFromWithCredentialsAndSelectOption(process.env.USERNAME,process.env.PASSWORD,'Option 1')
//     await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox(randomFullName,randomEmail,true)
// })


//la2eno khala2na pagemanager bel test-options
test('parametrized methods', async({pageManager}) => {
    console.log('hello2')
    const randomFullName = faker.person.fullName() //betredele esem randomly 
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com` //faker.number.int(1000) betred ra2em randomly men 1 la 1000
    await pageManager.onFormLayoutsPage().submitUsingTheGridFromWithCredentialsAndSelectOption(process.env.USERNAME,process.env.PASSWORD,'Option 1')
    await pageManager.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox(randomFullName,randomEmail,true)
})

