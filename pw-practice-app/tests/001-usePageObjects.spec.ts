import {test, expect} from '@playwright/test'
import {PageManager} from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'

test.beforeEach(async({page}) => {
    await page.goto("/")
})

test('navigate to form page @smoke', async({page}) => {

    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datepickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toastrPage();
    await pm.navigateTo().tooltipPage();
})

test('parametrized methods', async({page}) => {

    const pm = new PageManager(page) 
    const randomFullName = faker.person.fullName() //betredele esem randomly 
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com` //faker.number.int(1000) betred ra2em randomly men 1 la 1000
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFromWithCredentialsAndSelectOption(process.env.USERNAME,process.env.PASSWORD,'Option 1')
    await page.screenshot({path:'screenshots/formLayoutsPage.png'})
    const buffer=await page.screenshot()//eza bde l binary taba3 l soura
    console.log(buffer)
    await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox(randomFullName,randomEmail,true)
    await page.locator('nb-card',{hasText: 'Inline form'}).screenshot({path:'screenshots/inlineForm.png'})
    // await pm.navigateTo().datepickerPage()
    // await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(5)
    // await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(6,15)
})


