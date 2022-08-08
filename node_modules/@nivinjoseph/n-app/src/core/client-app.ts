// const Vue = require("@nivinjoseph/vue/dist/vue.js");
// import Vue from "@nivinjoseph/vue";
const Vue = require("vue");

// public
export { Vue };

import VueRouter from "vue-router";
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
Vue.use(VueRouter);

import "@nivinjoseph/n-ext";
import { given } from "@nivinjoseph/n-defensive";
import { Container, ComponentInstaller } from "@nivinjoseph/n-ject";
import { ComponentManager } from "./component-manager";
import { PageManager } from "./page-manager";
import { DefaultDialogService } from "./../services/dialog-service/default-dialog-service";
import { DefaultEventAggregator } from "./../services/event-aggregator/default-event-aggregator";
import { DefaultNavigationService } from "./../services/navigation-service/default-navigation-service";
import { DefaultStorageService } from "./../services/storage-service/default-storage-service";
import { ConfigurationManager } from "@nivinjoseph/n-config";
import { DefaultDisplayService } from "../services/display-service/default-display-service";
import { DefaultComponentService } from "../services/component-service/default-component-service";
import { NFileSelectViewModel } from "../components/n-file-select/n-file-select-view-model";
import { NExpandingContainerViewModel } from "../components/n-expanding-container/n-expanding-container-view-model";
import { NScrollContainerViewModel } from "../components/n-scroll-container/n-scroll-container-view-model";
import { ClassHierarchy } from "@nivinjoseph/n-util";
import { ComponentViewModel } from "./component-view-model";
import { PageViewModel } from "./page-view-model";
import { DialogService } from "../services/dialog-service/dialog-service";

// declare const makeHot: (options: any) => void;

let makeHot: Function | null;

if ((<any>module).hot)
{
    makeHot = function (options: any): void
    {
        // console.log('is Hot');
        const api = require("vue-hot-reload-api");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        api.install(require("@nivinjoseph/vue"));

        if (!api.compatible)
            throw new Error("vue-hot-reload-api is not compatible with the version of Vue you are using.");

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        (<any>module).hot.accept();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (!api.isRecorded("ClientAppRoot")) 
        {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            api.createRecord("ClientAppRoot", options);
            // console.log("creating record", "${id}");
        }
        else 
        {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            api.reload("ClientAppRoot", options);
            // console.log("updating record", "${id}");
        }
    };
}

// public
export class ClientApp
{
    private readonly _appElementId: string;
    private readonly _rootComponentElement: string;
    private readonly _options: object;
    private readonly _container: Container;
    private readonly _componentManager: ComponentManager;
    private readonly _pageManager: PageManager;
    // @ts-expect-error: not used atm
    private _app: any;
    private _isDialogServiceRegistered = false;
    private _errorTrackingConfigurationCallback: ((vueRouter: any) => void) | null = null;
    private _isBootstrapped = false;
    
    
    public get container(): Container { return this._container; }


    /**
     * 
     * @param appElementId 
     * @param rootComponentElement 
     * 
     * @description Requires dev dependencies
     * Check the dev dependencies in package.json
     */
    
    public constructor(appElementId: string, rootComponentElement: string, options?: object)
    {
        given(appElementId, "appElementId").ensureHasValue().ensureIsString().ensure(t => t.startsWith("#"));
        this._appElementId = appElementId;
        
        given(rootComponentElement, "rootComponentElement").ensureHasValue().ensureIsString();
        this._rootComponentElement = rootComponentElement;
        
        given(options as object, "options").ensureIsObject();
        this._options = options ?? {};
        
        this._container = new Container();
        this._componentManager = new ComponentManager(Vue, this._container);
        this._componentManager.registerComponents(
            NFileSelectViewModel, NExpandingContainerViewModel, NScrollContainerViewModel
        );
        this._pageManager = new PageManager(VueRouter, this._container, this._componentManager);

        Vue.config.silent = false;
        Vue.config.devtools = false;
        Vue.config.performance = false;
        Vue.config.productionTip = false;
    }


    public useInstaller(installer: ComponentInstaller): this
    {
        given(this, "this").ensure(t => !t._isBootstrapped, "already bootstrapped");

        given(installer, "installer").ensureHasValue();

        this._container.install(installer);
        return this;
    }

    public registerDialogService(dialogService: DialogService): this
    {
        given(dialogService, "dialogService").ensureHasValue().ensureIsObject();

        given(this, "this").ensure(t => !t._isBootstrapped, "already bootstrapped");

        this._container.registerInstance("DialogService", dialogService);
        this._isDialogServiceRegistered = true;

        return this;
    }

    public registerComponents(...componentViewModelClasses: Array<ClassHierarchy<ComponentViewModel>>): this
    {
        given(this, "this").ensure(t => !t._isBootstrapped, "already bootstrapped");

        this._componentManager.registerComponents(...componentViewModelClasses);
        return this;
    }

    public registerPages(...pageViewModelClasses: Array<ClassHierarchy<PageViewModel>>): this
    {
        given(this, "this").ensure(t => !t._isBootstrapped, "already bootstrapped");

        this._pageManager.registerPages(...pageViewModelClasses);
        return this;
    }

    public useAsInitialRoute(route: string): this
    {
        given(this, "this").ensure(t => !t._isBootstrapped, "already bootstrapped");

        given(route, "route").ensureHasValue().ensureIsString();
        this._pageManager.useAsInitialRoute(route);
        return this;
    }

    public useAsUnknownRoute(route: string): this
    {
        given(this, "this").ensure(t => !t._isBootstrapped, "already bootstrapped");

        given(route, "route").ensureHasValue().ensureIsString();
        this._pageManager.useAsUnknownRoute(route);
        return this;
    }
    
    // /**
    //  * @deprecated
    //  */
    // public useAsDefaultPageTitle(title: string): this
    // {
    //     if (this._isBootstrapped)
    //         throw new InvalidOperationException("useAsDefaultPageTitle");
        
    //     given(title, "title").ensureHasValue().ensureIsString();
    //     this._pageManager.useAsDefaultPageTitle(title);
    //     return this;
    // }
    
    // /**
    //  * @deprecated
    //  */
    // public useAsDefaultPageMetadata(...metas: Array<{ name: string; content: string; }>): this
    // {
    //     if (this._isBootstrapped)
    //         throw new InvalidOperationException("useAsDefaultPageMetadata");
        
    //     given(metas, "metas").ensureHasValue().ensureIsArray().ensure(t => t.length > 0);
    //     this._pageManager.useAsDefaultPageMetadata(metas);
    //     return this;
    // }
    
    public useHistoryModeRouting(): this
    {
        given(this, "this").ensure(t => !t._isBootstrapped, "already bootstrapped");

        // if (this._initialRoute)
        //     throw new InvalidOperationException("Cannot use history mode with initial route.");
        
        this._pageManager.useHistoryModeRouting();
        return this;
    }

    // public enableDevMode(): this
    // {
    //     if (this._isbootstrapped)
    //         throw new InvalidOperationException("enableDevMode");

    //     Config.enableDev(Vue);
    //     return this;
    // }

    public configureErrorTracking(callback: (vueRouter: any) => void): this
    {
        given(callback, "callback").ensureHasValue().ensureIsFunction();

        given(this, "this").ensure(t => !t._isBootstrapped, "already bootstrapped");

        this._errorTrackingConfigurationCallback = callback;
        return this;
    }

    public bootstrap(): void
    {
        given(this, "this").ensure(t => !t._isBootstrapped, "already bootstrapped");

        this._configureGlobalConfig();
        this._configurePages();
        this._configureErrorTracking();
        this._configureComponents();
        this._configureCoreServices();
        this._configureContainer();
        this._configureRoot();

        this._isBootstrapped = true;
        // this._pageManager.handleInitialRoute();
    }
    
    public retrieveRouterInstance(): object
    {
        given(this, "this").ensure(t => t._isBootstrapped, "calling retrieveRouterInstance before calling bootstrap")
            .ensure(t => t._pageManager.hasRegistrations, "calling retrieveRouterInstance with no page registrations");

        return this._pageManager.vueRouterInstance;
    }
    
    
    private _configureGlobalConfig(): void
    {
        if (ConfigurationManager.getConfig("env") === "dev")
        {
            console.log("Bootstrapping in DEV mode.");

            Vue.config.silent = false;
            Vue.config.devtools = true;
            Vue.config.performance = true;
            Vue.config.productionTip = true;
        }
        else
        {
            Vue.config.silent = true;
            Vue.config.devtools = false;
            Vue.config.performance = false;
            Vue.config.productionTip = false;
        }
        
        // console.log(`Bootstrapping in ${ConfigurationManager.getConfig("env")} mode.`);

        // Vue.config.silent = false;
        // Vue.config.devtools = true;
        // Vue.config.performance = true;
        // Vue.config.productionTip = true;
    }


    private _configureComponents(): void
    {
        this._componentManager.bootstrap();
    }

    private _configurePages(): void
    {
        this._pageManager.bootstrap();
    }
    
    private _configureErrorTracking(): void
    {
        if (this._errorTrackingConfigurationCallback != null)
            this._errorTrackingConfigurationCallback(this._pageManager.vueRouterInstance);
    }

    private _configureCoreServices(): void
    {
        this._container
            .registerInstance("EventAggregator", new DefaultEventAggregator())
            .registerInstance("NavigationService", new DefaultNavigationService(this._pageManager.vueRouterInstance))
            .registerInstance("StorageService", new DefaultStorageService())
            .registerInstance("DisplayService", new DefaultDisplayService())
            .registerInstance("ComponentService", new DefaultComponentService())
            ;
        
        if (!this._isDialogServiceRegistered)
            this._container.registerInstance("DialogService", new DefaultDialogService());
    }

    private _configureContainer(): void
    {
        this._container.bootstrap();
    }

    private _configureRoot(): void
    {
        const container = this._container;
        
        const componentOptions = {
            el: this._appElementId,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            render: (createElement: Function) => createElement(this._rootComponentElement),
            router: this._pageManager.vueRouterInstance,
            provide: function (): { rootScopeContainer: Container; }
            {
                return {
                    rootScopeContainer: container
                };
            },
            ...this._options
        };
        
        
        if (makeHot)
        {
            makeHot(componentOptions);
            console.log(`🔥 Hot Reload enabled`);
        }
        
        
        
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this._app = new Vue(componentOptions);
    }
}