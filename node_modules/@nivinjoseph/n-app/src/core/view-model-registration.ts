import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";
import { templateSymbol } from "./template";
import { ApplicationException } from "@nivinjoseph/n-exception";
import { componentsSymbol } from "./components";
import { persistSymbol } from "./persist";
import { Utils } from "./utils";


type RenderInfo = { render: Function; staticRenderFns: Array<Function>; };

export class ViewModelRegistration
{
    private readonly _name: string;
    private readonly _viewModel: Function;
    private readonly _template: string | RenderInfo;
    private readonly _components: ReadonlyArray<Function> | null = null;
    private readonly _persist: boolean;
    
    private _isCreated = false;
    
    
    public get name(): string { return this._name; }
    public get viewModel(): Function { return this._viewModel; }
    public get template(): string | RenderInfo { return this._template; }
    public get components(): ReadonlyArray<Function> | null { return this._components; }
    public get persist(): boolean { return this._persist; }
    
    public get isCreated(): boolean { return this._isCreated; }
    
    
    public constructor(viewModel: Function)
    {
        given(viewModel, "viewModel").ensureHasValue().ensureIsFunction();
        
        this._name = Utils.getTypeName(viewModel);
        if (!this._name.endsWith("ViewModel"))
            throw new ApplicationException(`Registered ViewModel '${this._name}' violates ViewModel naming convention.`);
        
        this._viewModel = viewModel;
        
        if (!Reflect.hasOwnMetadata(templateSymbol, this._viewModel))
            throw new ApplicationException(`ViewModel'${this.name}' does not have @template applied.`);    
        
        this._template = Reflect.getOwnMetadata(templateSymbol, this._viewModel);
        
        if (Reflect.hasOwnMetadata(componentsSymbol, this._viewModel))
            this._components = Reflect.getOwnMetadata(componentsSymbol, this._viewModel);
            
        if (Reflect.hasOwnMetadata(persistSymbol, this._viewModel))
            this._persist = Reflect.getOwnMetadata(persistSymbol, this._viewModel);
        else
            this._persist = false;
    }
    
    public created(): void
    {
        this._isCreated = true;
    }
    
    
    // public reload(viewModel: Function): void
    // {
    //     given(viewModel, "viewModel").ensureHasValue();

    //     this._name = (" " + (<Object>viewModel).getTypeName().trim()).substr(1); // Shrey: Safari de-optimization
    //     if (!this._name.endsWith("ViewModel"))
    //         throw new ApplicationException(`Registered ViewModel '${this._name}' violates ViewModel naming convention.`);

    //     this._viewModel = viewModel;

    //     if (!Reflect.hasOwnMetadata(templateSymbol, this._viewModel))
    //         throw new ApplicationException(`ViewModel'${this.name}' does not have @template applied.`);

    //     this._template = Reflect.getOwnMetadata(templateSymbol, this._viewModel);
    // }
}