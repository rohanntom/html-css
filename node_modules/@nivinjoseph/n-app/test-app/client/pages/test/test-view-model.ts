import { route, template, meta, NavigationService, resolve, EventAggregator, PageViewModel, components } from "./../../../../src/index";
import * as Routes from "./../routes";
import "./test-view.scss";
import { inject } from "@nivinjoseph/n-ject";
import { TodoRepository } from "../../services/todo-repository/todo-repository";
import { given } from "@nivinjoseph/n-defensive";
import { TestResolverFoo } from "../../resolvers/test-resolver-foo";
import { TestResolverBar } from "../../resolvers/test-resolver-bar";
import { ComponentAViewModel } from "./components/component-a/component-a-view-model";
import { NonReorderableListViewModel } from "./components/non-reorderable-list/non-reorderable-list-view-model";


@components(ComponentAViewModel, NonReorderableListViewModel)
@template(require("./test-view.html"))
@route(Routes.test)
@meta({$key: "name", name: "description", content: "This is test"})    
@inject("TodoRepository", "NavigationService", "EventAggregator")    
@resolve(TestResolverBar, TestResolverFoo) 
export class TestViewModel extends PageViewModel
{
    // @ts-expect-error: not used atm
    private readonly _todoRepository: TodoRepository;
    
    private readonly _navigationService: NavigationService;
    // @ts-expect-error: not used atm
    private readonly _eventAggregator: EventAggregator;
    private _id = 0;
    
    
    public get id(): number { return this._id; }
    
    public get players(): ReadonlyArray<Player>  { return [{ name: 'Shrey', nationality: null }, { name: 'Albert', nationality: "India" }]; }
    
    
    public constructor(todoRepository: TodoRepository, navigationService: NavigationService, eventAggregator: EventAggregator)
    {
        super();
        
        given(todoRepository, "todoRepository").ensureHasValue().ensureIsObject();
        this._todoRepository = todoRepository;
        
        given(navigationService, "navigationService").ensureHasValue().ensureIsObject();
        this._navigationService = navigationService;
        
        given(eventAggregator, "eventAggregator").ensureHasValue().ensureIsObject();
        this._eventAggregator = eventAggregator;
    }
    
    
    public go(id: number): void
    {
        this._navigationService.navigate(Routes.test, { id: ++id });
        
        // this._eventAggregator.publish("openFileSelect", "foo");
    }
    
    public onFileSelected(val: unknown): void
    {
        console.log("File data", val);
    }
    
    public clicked(player: Player): void
    {
        console.log(player.nationality);
    }
    
    protected override onCreate(): void
    {
        super.onCreate();
        
        console.log("test page on create");
    }
    
    protected override onEnter(arg: number, resolved1: string, resolved2: string): void
    {
        super.onEnter(arg, resolved1, resolved2);
        
        console.log("test page on enter");
           
        // console.log("resolved", resolved1);
        
        console.log("id is", arg);
        
        this._id = arg;
    }
}

export interface Player
{
    name: string;
    nationality: string | null;
}

// @template(require("./test-view.html"))
// @route(Routes.test)
// export class TestViewModel extends BasePageViewModel
// {
// }