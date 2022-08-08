import "@nivinjoseph/n-ext";
import { Vue, ClientApp } from "./core/client-app";
import { element } from "./core/element";
import { template } from "./core/template";
import { title } from "./core/title";
import { meta, MetaDetail } from "./core/meta";
import { route } from "./core/route";
import { bind } from "./core/bind";
import { events } from "./core/events";
import { components } from "./core/components";
import { pages } from "./core/pages";
import { ComponentViewModel } from "./core/component-view-model";
import { PageViewModel } from "./core/page-view-model";
import { Utils } from "./core/utils";
import { StorageService } from "./services/storage-service/storage-service";
import { EventAggregator, EventSubscription } from "./services/event-aggregator/event-aggregator";
import { NavigationService } from "./services/navigation-service/navigation-service";
import { DialogService, DialogServiceOptions, DialogLocation } from "./services/dialog-service/dialog-service";
import { DisplayService } from "./services/display-service/display-service";
import { DisplayType } from "./services/display-service/display-type";
import { ComponentService } from "./services/component-service/component-service";
import { ComponentOptions } from "./services/component-service/component-options";
import { resolve, Resolution, Resolver } from "./core/resolve";
import { NavRoute } from "./core/nav-route";
import { FileInfo } from "./components/n-file-select/n-file-select-view-model";
import { persist } from "./core/persist";
import { DefaultDialogService } from "./services/dialog-service/default-dialog-service";


export
{
    Vue, ClientApp,
    element,
    route,
    template,
    title,
    meta, MetaDetail as metaDetail,
    bind,
    events,
    components,
    pages,
    persist,
    ComponentViewModel,
    PageViewModel,
    Utils,
    StorageService,
    EventAggregator, EventSubscription,
    NavigationService,
    DialogService, DialogServiceOptions, DialogLocation, DefaultDialogService,
    DisplayService, DisplayType,
    ComponentService, ComponentOptions,

    resolve, Resolver, NavRoute, Resolution,

    FileInfo
};