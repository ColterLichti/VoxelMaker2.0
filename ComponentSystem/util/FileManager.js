

// Handles file IO in a more native style
// File opening can be done async-ish with promise
// File saving is always done syncronously
export class FileManager {
    constructor() {
        // Make sure core functions/properties are not changed!
        Object.defineProperties(this, {
            // How long to wait for events to finish firing
            // (values over 100 will likely be noticed by the human eye)
            // Too small of a value will cause cancel event to fail or misfire!
            eventDelayMS: {
                value: 100,
                writable: true,
                enumerable: true,
                configurable: false
            },
            _file_input: {
                value: document.createElement('input'),
                writable: false,
                enumerable: false,
                configurable: false
            },
            _event_already_fired: {
                value: false,
                writable: true,
                enumerable: false,
                configurable: false
            },
            _choose_success: {
                value: false,
                writable: true,
                enumerable: false,
                configurable: false
            },
            _chooseStart: {
                value: () => {
                    // Reset flags when process starts
                    this._event_already_fired = false;
                    this._choose_success = false;

                    // Clear old value so change fires on repeat selection
                    this._file_input.value = '';

                    // Best case: window focuses after dialog close
                    window.addEventListener('focus', this._chooseEnd_handler);
                    // Redundancy: May not trigger immedately but will trigger in most cases
                    document.body.addEventListener('mouseenter', this._chooseEnd_handler);
                    // Redundancy: May not trigger immediately but will be guaranteed to fire eventually
                    window.addEventListener('mousemove', this._chooseEnd_handler);
                },
                writable: false,
                enumerable: false,
                configurable: false
            },
            _chooseEnd_handler: {
                value: () => {
                    // Only need ONE of those events, ignore the rest
                    if (this._event_already_fired)
                        return;
                    this._event_already_fired = true;

                    // Wait some time to let 'changed' event finish firing
                    // Don't know that it will, but have to give it time...
                    // just in case!
                    setTimeout(() => {
                        if (!this._choose_success) {
                            // Choose process done, no file selected
                            // Fire cancel event on input
                            this._file_input.dispatchEvent(new Event('cancel'));
                        } else {
                            // Choose process done, file was selected
                            // Fire chosen event on input
                            this._file_input.dispatchEvent(new Event('choose'));
                        }

                        // remove listeners or cancel will keep firing
                        window.removeEventListener('focus', this._chooseEnd_handler);
                        document.body.removeEventListener('mouseenter', this._chooseEnd_handler);
                        window.removeEventListener('mousemove', this._chooseEnd_handler);

                        // How long to wait
                    }, this.eventDelayMS);
                },
                writable: false,
                enumerable: false,
                configurable: false
            },
            _defaultChoose_handler: {
                value: (event) => {
                    // Input was changed (file selected)
                    // This is the event to wait for!
                    this._choose_success = true;
                    // Process is also done when a file is chosen!
                    this._chooseEnd_handler();
                },
                writable: false,
                enumerable: false,
                configurable: false
            },
            addEventListener: {
                value: (type, handle) => {
                    this._file_input.addEventListener(type, handle);
                },
                writable: false,
                enumerable: false,
                configurable: false
            },
            removeEventListener: {
                value: (type, handle) => {
                    this._file_input.removeEventListener(type, handle);
                },
                writable: false,
                enumerable: false,
                configurable: false
            },
            openFile: {
                value: () => {
                    // Trigger custom pre-click event
                    this._chooseStart();

                    // Show file dialog
                    this._file_input.click();
                    // ^^^ Code will still run after this part (non halting)
                    // Events will not trigger though until the dialog is closed
                    // That's where the fun begins!

                    // Allow for async/await and try catch
                    return new Promise((res, rej) => {
                        // Technically added to file input
                        this.addEventListener('choose', () => { res(this._file_input.files) });
                        this.addEventListener('cancel', () => { rej('User cancelled file selection!') });
                    });
                },
                writable: false,
                enumerable: false,
                configurable: false
            },
            saveFile: {
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
            }
        });

        // Set up type and add change listener
        this._file_input.type = 'file';
        this._file_input.addEventListener('change', this._defaultChoose_handler);
    }

    // Set multi-select
    set multiSelect(value) {
        let val = value ? 'multiple' : '';
        this._file_input.setAttribute('multiple', val);
    }

    // Get multi-select
    get multiSelect() {
        return this._file_input.multiple === 'multiple' ? true : false;
    }
    
}