import { route, template, resolve, pages } from "./../../../../src/index";
import * as Routes from "./../routes";
import { BasePageViewModel } from "../base-page-view-model";
import { TestResolverFoo } from "../../resolvers/test-resolver-foo";
import { ListTodosViewModel } from "./list-todos/list-todos-view-model";
import { CreateTodoViewModel } from "./create-todo/create-todo-view-model";
import { UpdateTodoViewModel } from "./update-todo/update-todo-view-model";


@pages(ListTodosViewModel, CreateTodoViewModel, UpdateTodoViewModel)
@template(require("./todo-view.html"))
@route(Routes.todo, Routes.listTodos)
@resolve(TestResolverFoo)    
export class TodoViewModel extends BasePageViewModel
{
    private readonly _message = "Todo View";
    
    
    public get message(): string { return this._message; }
}

