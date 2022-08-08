import { route, template, DialogService, EventAggregator, NavigationService, StorageService, title, components } from "./../../../../src/index";
import * as Routes from "./../routes";
import { BasePageViewModel } from "./../base-page-view-model";
import { inject } from "@nivinjoseph/n-ject";
import "./dashboard-view.scss";
import { ScopedService } from "../../services/scoped-service";
import { BindingTestViewModel } from "../../components/binding-test/binding-test-view-model";
import { Duration, synchronize } from "@nivinjoseph/n-util";
// import { Delay } from "@nivinjoseph/n-util";


@components(BindingTestViewModel)
@template(require("./dashboard-view.html"))
@route(Routes.dashboard)  
@title("Dashboard")    
@inject("DialogService", "EventAggregator", "NavigationService", "StorageService", "ScopedService")    
export class DashboardViewModel extends BasePageViewModel
{
    private readonly _dialogService: DialogService;
    // @ts-expect-error: not used atm
    private readonly _eventAggregator: EventAggregator;
    // @ts-expect-error: not used atm
    private readonly _navigationService: NavigationService;
    // @ts-expect-error: not used atm
    private readonly _storageService: StorageService;
    // @ts-expect-error: not used atm
    private readonly _scopedService: ScopedService;
    
    
    private readonly _message = "Dashboard view";
    private _score = 10;
    private _fooParentValue: string | null;
    // private _isActive = false;
    
    public get score(): number { return this._score; }
    
    
    public get message(): string { return this._message; }
    
    
    public get fooParentValue(): string | null { return this._fooParentValue; }
    public set fooParentValue(value: string | null)
    {
        console.log("setting", value);
        this._fooParentValue = value;
    }
    
    
    public constructor(dialogService: DialogService, evenAggregator: EventAggregator,
        navigationService: NavigationService, storageService: StorageService, scopedService: ScopedService)
    {
        super();

        this._dialogService = dialogService;
        this._eventAggregator = evenAggregator;
        this._navigationService = navigationService;
        this._storageService = storageService;
        this._scopedService = scopedService;

        // this._fooParentValue = "whatever";
        // this._fooParentValue = null as any;
        this._fooParentValue = null;
        // this._fooParentValue = 1 as any;

        this.executeOnDestroy(() => console.log("Destroying dashboard"));
    }
    
    
    @synchronize(Duration.fromMilliSeconds(1000))
    public increment(): void
    {
        // console.log(this);
        // console.log("isActive", this._isActive);
        
        // if (this._isActive === true)
        //     return;
        
        // try
        // {
        //     this._isActive = true;
            
            
            
        //     // do all the logic
        // }
        // finally
        // {
        //     this._isActive = false;
        // }
        
        // this._isActive = true;
        
        // await Delay.milliseconds(100);
        
        this._score++;
        
        this._dialogService.showWarningMessage("Score incremented");
        
        // this._dialogService.showLoadingScreen();
        // setTimeout(() => this._dialogService.hideLoadingScreen(), 5000);
        
        // this._dialogService.showErrorMessage("haha");
        
        // this._navigationService.navigate(Routes.updateTodo, { id: 5 });
        
        // this._isActive = false;
    }
}

