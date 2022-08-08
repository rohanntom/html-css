import { LoaderContext } from "webpack";
import { FunctionNode } from "./function-node";

export function transformRenderFns(isDebug: boolean, renderFn: string, context: LoaderContext<any>, viewModelClassName: string): string
{
    // renderFn = renderFn.replaceAll(",\r", ", ").replaceAll(",\n", ", ").replaceAll(",\r\n", ", ")
    //     .replaceAll("(\r", "(").replaceAll("(\n", "(").replaceAll("(\r\n", "(")
    //     .replaceAll(/[a-zA-Z0-9_]\\n/ig as any, ";");

    while (renderFn.contains("  "))
        renderFn = renderFn.replaceAll("  ", " ");

    renderFn = renderFn.replaceAll("_c( ", "_c(");
    
    
    
    const node = new FunctionNode(isDebug, renderFn, 0, viewModelClassName);
    node.preProcess();
    
    node.regenerate(context);
    
    return node.toModdedCode();
}