import { route, template } from "./../../../../../src/index";
import * as Routes from "./../../routes";
import { BasePageViewModel } from "../../base-page-view-model";


@template(require("./update-todo-view.html"))
@route(Routes.updateTodo)
export class UpdateTodoViewModel extends BasePageViewModel
{
    private readonly _message = "Update Todo View";


    public get message(): string { return this._message; }
}