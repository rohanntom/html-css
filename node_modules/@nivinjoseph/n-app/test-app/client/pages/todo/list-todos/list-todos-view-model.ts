import { route, template, resolve } from "./../../../../../src/index";
import * as Routes from "./../../routes";
import { BasePageViewModel } from "../../base-page-view-model";
import { TestResolverFoo } from "../../../resolvers/test-resolver-foo";


@template(require("./list-todos-view.html"))
@route(Routes.listTodos)
@resolve(TestResolverFoo)  
export class ListTodosViewModel extends BasePageViewModel
{
    private readonly _message = "List Todos View";
    
    
    public get message(): string { return this._message; }
}