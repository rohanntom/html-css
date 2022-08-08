import { DialogService, DialogServiceOptions } from "./dialog-service";
export declare class DefaultDialogService implements DialogService {
    private readonly _accentColor;
    private readonly _toastr;
    private _loadingScreenCount;
    private _loadingScreen;
    private _spinner;
    constructor(options?: DialogServiceOptions);
    showLoadingScreen(): void;
    hideLoadingScreen(): void;
    showMessage(message: string, title?: string): void;
    showSuccessMessage(message: string, title?: string): void;
    showWarningMessage(message: string, title?: string): void;
    showErrorMessage(message: string, title?: string): void;
    clearMessages(): void;
    private _createLoadingScreen;
}
