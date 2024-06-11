import { Locator, Page, expect } from "@playwright/test";
import {NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutPage} from '../page-objects/formLayoutsPage'
import {DatePickerPage} from '../page-objects/datePickerPage'
import { HelperBase } from "./helperBase";
export class PageManager extends HelperBase{
    private readonly navigationPage:NavigationPage
    private readonly formLayoutPage:FormLayoutPage
    private readonly datePickerPage:DatePickerPage
    constructor(page:Page){
        super(page)
        this.navigationPage=new NavigationPage(this.page)
        this.formLayoutPage=new FormLayoutPage(this.page)
        this.datePickerPage=new DatePickerPage(this.page)
    }
    navigateTo(){
        return this.navigationPage
    }
    onFormLayoutsPage(){
        return this.formLayoutPage
    }
    onDatePickerPage(){
        return this.datePickerPage
    }
}

