import { defineConfig, devices, firefox } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();


export default defineConfig<TestOptions>({
  timeout : 40000,
 // globalTimeout:60000,
  expect:{timeout:2000,toMatchSnapshot:{maxDiffPixels:50}},
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  //reporter: 'html',
  reporter: [['json',{outputFile:'test-results/jsonReport.json'}],
  ['junit',{outputFile:'test-results/junitReport.xml'}],
  //['allure-playwright'],
  ['html']], // l result byetla3 as json w byetsavac bel path l mahtout
  use: {
     globalsQaUrl:'https://www.globalsqa.com/demo-site/draganddrop/',
      baseURL:process.env.DEV==='1'? 'http://localhost:4201/' 
              :process.env.STAGING=='1'?'http://localhost:4202/'
              :'http://localhost:4200/',

    trace: 'on-first-retry',
     video:{
       mode:"off",
       size:{width:1920,height:1080}
     },
    actionTimeout:20000,
    navigationTimeout:25000
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'dev',
      use: { ...devices['Desktop Chrome'],
      baseURL: 'http://localhost:4200/', },
      
    },

    {
      name: 'staging',
      use: { ...devices['Desktop Chrome'],
      baseURL: 'http://localhost:4202/', },
      
    },


    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { browserName:'firefox',
      video:{
        mode:"on",
        size:{width:1920,height:1080}
      }},
      
    },

    {
      name: 'mobile',
      testMatch:'testMobile.spec.ts',
      use:{
        ...devices['iPhone 13 Pro']
      }
      
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },],

    webServer:{ //hay la docker
      command:'npm run start',
      url:'http://localhost:4200/'
    }
});
