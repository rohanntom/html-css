import { template } from "../../core/template";
import { element } from "../../core/element";
import { bind } from "../../core/bind";
import { ComponentViewModel } from "../../core/component-view-model";
import { inject } from "@nivinjoseph/n-ject";
import { DialogService } from "../../services/dialog-service/dialog-service";
import { EventAggregator } from "../../services/event-aggregator/event-aggregator";
import { given } from "@nivinjoseph/n-defensive";
// import * as $ from "jquery";
import { events } from "../../core/events";
import { Deferred, TypeHelper } from "@nivinjoseph/n-util";

// public
export interface FileInfo
{
    fileName: string;
    fileType: string;
    fileSize: number;
    fileData: string;
    fileMime: string;
    fileDataUrl: string;
    nativeFile: File;
}


@template(require("./n-file-select-view.html"))
@element("n-file-select")
@bind({
    id: "string",
    mimeTypes: "string",
    "maxFileSize?": "number",
    "multiple?": "boolean"
})
@events("select")
@inject("DialogService", "EventAggregator")
export class NFileSelectViewModel extends ComponentViewModel
{
    private readonly _dialogService: DialogService;
    private readonly _eventAggregator: EventAggregator;
    private readonly _inputTemplate = `<input type="file" accept="{0}" style="display: none" />`;
    private readonly _inputTemplateMultiple = `<input type="file" accept="{0}" multiple style="display: none" />`;
    private _inputElement!: JQuery<HTMLElement>;
    private _maxFileSizeBytes: number | null = null;


    private get _mimeTypesList(): string { return this.getBound("mimeTypes"); }
    private get _maxFileSizeValue(): number | null { return TypeHelper.parseNumber(this.getBound("maxFileSize")); }
    private get _isMultiple(): boolean { return this.getBound("multiple") != null && this.getBound("multiple") === true; }


    public constructor(dialogService: DialogService, eventAggregator: EventAggregator)
    {
        super();

        given(dialogService, "dialogService").ensureHasValue().ensureIsObject();
        this._dialogService = dialogService;

        given(eventAggregator, "eventAggregator").ensureHasValue().ensureIsObject();
        this._eventAggregator = eventAggregator;

        this.executeOnCreate(() =>
        {
            const id = this.getBound<string>("id");
            given(id, "id").ensureHasValue().ensureIsString();

            const sub = this._eventAggregator.subscribe("openFileSelect", (identifier) =>
            {
                if (identifier !== id)
                    return;

                this._inputElement.click();
            });

            this.executeOnDestroy(() => sub.unsubscribe());
        });
    }


    protected override onMount(element: HTMLElement): void
    {
        this._initializeMaxFileSizeBytes();

        const inputText = this._isMultiple
            ? this._inputTemplateMultiple.format(this._mimeTypesList) : this._inputTemplate.format(this._mimeTypesList);

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        const fchange = function (this: any): void
        {
            that._processFiles(this.files);
            $(this).off("change");
            $(this).remove();
            that._inputElement = $(inputText);
            that._inputElement.change(fchange).appendTo($(element));
        };

        this._inputElement = $(inputText);
        this._inputElement.change(fchange).appendTo($(element));
    }


    private _processFiles(files: FileList | null): void
    {
        this._dialogService.showLoadingScreen();

        if (files == null || files.length === 0)
            return;

        const promises = new Array<Promise<FileInfo>>();

        for (const file of files)
            promises.push(this._createFileInfo(file));

        Promise.all(promises)
            .then((results) =>
            {
                const processedFiles = new Array<FileInfo>();
                const failedFiles = new Array<FileInfo>();

                results.forEach(t =>
                {
                    if (this._ensureFileSizeIsAllowed(t))
                        processedFiles.push(t);
                    else
                        failedFiles.push(t);
                });

                failedFiles.forEach(t => this._dialogService.showWarningMessage(
                    "File {0} exceeded the file size limit of {1} MB.".format(t.fileName, this._maxFileSizeValue)));

                if (processedFiles.length > 0)
                    this.emit("select", this._isMultiple ? processedFiles : processedFiles[0]);

                this._dialogService.hideLoadingScreen();
            })
            .catch((e) =>
            {
                console.error(e);
                this._dialogService.showErrorMessage("An error occurred while processing the files.", "ERROR");
                this._dialogService.hideLoadingScreen();
            });
    }

    private _createFileInfo(file: File): Promise<FileInfo>
    {
        const fileInfo = {} as FileInfo;
        fileInfo.nativeFile = file;
        fileInfo.fileName = file.name;
        fileInfo.fileType = file.type;
        fileInfo.fileSize = file.size;

        const deferred = new Deferred<FileInfo>();

        // if (fileInfo.fileType == null || fileInfo.fileType.isEmptyOrWhiteSpace())
        // {
        //     if (fileInfo.fileName.contains("."))
        //     {
        //         const splitted = fileInfo.fileName.trim().split(".");
        //         fileInfo.fileType = "." + splitted[splitted.length - 1].trim();
        //     }
        // }

        const reader = new FileReader();
        reader.onload = function (e: any): void
        {
            fileInfo.fileDataUrl = e.target.result;
            const splitted = (e.target.result as string).split(",");
            fileInfo.fileMime = splitted[0].trim().split(";")[0].substr(5);
            fileInfo.fileData = splitted[1];
            deferred.resolve(fileInfo);
        };

        reader.onerror = function (e: any): void
        {
            deferred.reject(e);
        };

        reader.readAsDataURL(file);

        return deferred.promise;
    }

    private _ensureFileSizeIsAllowed(fileInfo: FileInfo): boolean
    {
        return this._maxFileSizeBytes != null ? fileInfo.fileSize <= this._maxFileSizeBytes : true;
    }

    private _initializeMaxFileSizeBytes(): void
    {
        this._maxFileSizeBytes = this._maxFileSizeValue != null ? Number.parseInt(this._maxFileSizeValue.toString()) * 1024 * 1024 : null;
    }
}