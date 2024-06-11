import {test, expect} from '@playwright/test'

test.beforeEach(async({page}, testInfo) => {
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)// hay betzid 2s la kel test
})



test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')
   // await successButton.click()
   // const text = await successButton.textContent()//hay ma betbej la2eno function textcontent btontour la text ysir available
   //await successButton.waitFor({state:"attached"}) // hay kermel ma tbej  function li baeda byontour l element la ysir available
   //const text = await successButton.allTextContents() //hay  betbej la2eno function allTextContents ma  btontour
   // expect(text).toEqual('Data loaded with AJAX get request.')
    await expect(successButton).toHaveText('Data loaded with AJAX get request.',{timeout:20000})//tohavetext btontour bas 5s laykoun l element available hala2 be hal case ma rah tbej la2eno fina nzedla waet l waiting
    })

    test.skip('alternative waits', async({page}) => {
        const successButton = page.locator('.bg-success')
       //wait for element
       await page.waitForSelector('.bg-success')
       //wait for particular response
       await page.waitForResponse('http://uitestingplayground.com/ajaxdata') // hay eza API
       //wait for network calls to be completed('Not REcommended')
       await page.waitForLoadState('networkidle')// byontour kel l APIs tekhlas 
        //wait for an event(finction example)
        //wait for a specific time
        await page.waitForTimeout(5000)     
        const text = await successButton.allTextContents() //hay  betbej la2eno function allTextContents ma  btontour
        expect(text).toContain('Data loaded with AJAX get request.')
        })



        test.skip('timeouts', async({page}) => {
           test.setTimeout(10000)//betsir l testaction li m3arafe bel playwright 8s betsr 10s
            test.slow() // bya3moul l timeout X3 taba3 l  test timeout
            const successButton = page.locator('.bg-success')
           await successButton.click({timeout:16000})//bel playwirght.config.ts l actiontimeout mahtouta 5s bas btekhoud en consideration l 16s bas be hal cas mana moufide la2eno l test kelo timeout=10s
            })