
export class FileManager {
    _file_input;

    constructor() {

        // Make sure core function are not changed!

        // 💡 This can only be called from a user input event or it wont work! 💡
        Object.defineProperty(this, 'openFile', {
            value: () => {
                this._file_input.click();
                return new Promise((res, rej) => {
                    this._file_input.addEventListener('change', (event) => {
                        res(event.target.files[0]);
                    });
                });
            },
            writable: false,
            enumerable: false,
            configurable: false
        });

        // 💡 This can only be called from a user input event or it wont work! 💡
        Object.defineProperty(this, 'saveFile', {
            value: (fileName, content, extension) => {
                // Add content to blob
                let blob = new Blob([content], { type: 'VDF;charset=utf-8', from: window.location.hostname });
                // Get url to binary data
                let blobURL = URL.createObjectURL(blob);
                // Make a virtual link
                let vLink = document.createElement('a');
                // Add the url
                vLink.href = blobURL;
                // Set the filename and download attribute
                vLink.download = fileName + (extension === undefined ? '.txt' : extension);
                // Simulate a click to start the download
                vLink.click();
                // Revoke URL to blob
                URL.revokeObjectURL(blobURL);
            },
            writable: false,
            enumerable: false,
            configurable: false
        });

        this._file_input = document.createElement('input');
        this._file_input.type = 'file';
    }
}