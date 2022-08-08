const Toastr = require("./../../../vendor/toastr.js");
if (!Toastr)
    console.log("No Toastr!!!");

const Spinner = require("./../../../vendor/spin.js");
if (!Spinner)
    console.log("No Spinner!!!");

import { DialogLocation, DialogService, DialogServiceOptions } from "./dialog-service";
// import * as $ from "jquery";
import { given } from "@nivinjoseph/n-defensive";


export class DefaultDialogService implements DialogService
{
    private readonly _accentColor: string = "#000";
    private readonly _toastr: Toastr;
    private _loadingScreenCount = 0;
    private _loadingScreen: JQuery<HTMLElement> | null = null;
    private _spinner: any = null;


    public constructor(options?: DialogServiceOptions)
    {
        const accentColor = options?.accentColor;
        const dialogLocation = options?.dialogLocation ?? DialogLocation.bottomRight;
        const newestOnTop = options?.newestOnTop ?? false;
        const enableCloseButton = options?.enableCloseButton ?? false;

        given(accentColor, "accentColor").ensureIsString().ensure(t => t.trim().startsWith("#"), "must be hex value");
        given(dialogLocation, "dialogLocation").ensureHasValue().ensureIsEnum(DialogLocation);
        given(newestOnTop, "newestOnTop").ensureHasValue().ensureIsBoolean();
        given(enableCloseButton, "enableCloseButton").ensureHasValue().ensureIsBoolean();

        if (accentColor)
            this._accentColor = accentColor.trim();

        this._toastr = (<any>window).toastr;

        this._toastr.options.timeOut = 4000;
        this._toastr.options.positionClass = dialogLocation;
        this._toastr.options.newestOnTop = newestOnTop;
        this._toastr.options.closeButton = enableCloseButton;
    }


    public showLoadingScreen(): void
    {
        if (this._loadingScreenCount === 0)
        {
            if (!this._loadingScreen)
            {
                this._createLoadingScreen();
            }

            this._loadingScreen!.show();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            this._spinner.spin(document.getElementById("spinnerLocation"));
        }

        this._loadingScreenCount++;
    }

    public hideLoadingScreen(): void
    {
        this._loadingScreenCount--;

        if (this._loadingScreenCount < 0)
            this._loadingScreenCount = 0;

        if (this._loadingScreenCount === 0)
        {
            if (this._loadingScreen && this._spinner)
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                this._spinner.stop();
                this._loadingScreen.hide();
            }
        }
    }

    public showMessage(message: string, title?: string): void
    {
        if (title)
        {
            this._toastr.info(message, title);
        }
        else
        {
            this._toastr.info(message);
        }
    }

    public showSuccessMessage(message: string, title?: string): void
    {
        if (title)
        {
            this._toastr.success(message, title);
        }
        else
        {
            this._toastr.success(message);
        }
    }

    public showWarningMessage(message: string, title?: string): void
    {
        if (title)
        {
            this._toastr.warning(message, title);
        }
        else
        {
            this._toastr.warning(message);
        }
    }

    public showErrorMessage(message: string, title?: string): void
    {
        if (title)
        {
            this._toastr.error(message, title);
        }
        else
        {
            this._toastr.error(message);
        }
    }

    public clearMessages(): void
    {
        this._toastr.clear();
    }


    private _createLoadingScreen(): void
    {
        this._loadingScreen = $("<div style='position:fixed;top:0;left:0;right:0;bottom:0;z-index:100000000;background-color:rgba(255, 255, 255, 0.1);'><div id='spinnerLocation' style='position:absolute;top:50%;left:50%;'></div></div>")
            .appendTo($("body"));

        // var opts = {
        //    lines: 13, // The number of lines to draw
        //    length: 20, // The length of each line
        //    width: 10, // The line thickness
        //    radius: 30, // The radius of the inner circle
        //    corners: 1, // Corner roundness (0..1)
        //    rotate: 0, // The rotation offset
        //    direction: 1, // 1: clockwise, -1: counterclockwise
        //    color: '#FF7C00', //'#000', // #rgb or #rrggbb or array of colors
        //    speed: 1, // Rounds per second
        //    trail: 60, // Afterglow percentage
        //    shadow: false, // Whether to render a shadow
        //    hwaccel: false, // Whether to use hardware acceleration
        //    className: 'spinner', // The CSS class to assign to the spinner
        //    zIndex: 2e9, // The z-index (defaults to 2000000000)
        //    top: 'auto', // Top position relative to parent in px
        //    left: 'auto' // Left position relative to parent in px
        // };


        const opts = {
            lines: 12, // The number of lines to draw
            length: 10, // The length of each line
            width: 4, // The line thickness
            radius: 10, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: this._accentColor, // '#000', // #rgb or #rrggbb or array of colors
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: "spinner", // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: "auto", // Top position relative to parent in px
            left: "auto" // Left position relative to parent in px
        };

        const target = document.getElementById("spinnerLocation");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this._spinner = new Spinner(opts).spin(target);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this._spinner.stop();
        this._loadingScreen.hide();
    }
}